import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post } from 'src/app/models/Post';
import { CommentService } from 'src/app/service/comment.service';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  isUserPostsLoaded = false;
  posts!: Post[];

  constructor(
    private postService: PostService,
    private imgService: ImageUploadService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.postService.getAllPostsForUser()
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesForPosts(this.posts);
        this.getCommentsForPosts(this.posts);
        this.isUserPostsLoaded = true;
      })
  }

  getImagesForPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.imgService.getImageForPost(p.id!)
        .subscribe((data: { imageBytes: File }) => {
          p.image = data.imageBytes;
        })
    });
  }

  getCommentsForPosts(posts: Post[]): void {
    posts.forEach(p => {
      this.commentService.getAllCommentsToPost(p.id!)
        .subscribe(data =>
          p.comments = data)
    });
  }

  deletePost(post: Post, index: number): void {
    console.log(post);
    const result = confirm('Do you really want to delete this post?');
    if (result) {
      this.postService.deletePost(post.id!)
        .subscribe(() => {
          this.posts.splice(index, 1);
          this.notificationService.showSnackBar('Post deleted');
        });
    }
  }

  deleteComment(commentId: number, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.deleteComment(commentId)
      .subscribe(() => {
        post.comments?.splice(commentIndex, 1);
        this.notificationService.showSnackBar('Comment removed');
      });
  }

  openEditDialog(post: Post): void {
    const dialogPostEditConfig = new MatDialogConfig();
    dialogPostEditConfig.width = '800px';
    dialogPostEditConfig.height = '760px';
    dialogPostEditConfig.scrollStrategy?.disable;
    dialogPostEditConfig.data = {
      post: post
    }
    this.dialog.open(EditPostComponent, dialogPostEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}

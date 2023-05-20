import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { CommentService } from 'src/app/service/comment.service';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  isUserDataLoaded = false;
  user!: User;
  selectedFile!: File;
  userProfileImg!: File;
  previewImgURL: any;
  posts!: Post[];
  isUserPostsLoaded = false;

  constructor(
    private postService: PostService,
    private imgService: ImageUploadService,
    private userService: UserService,
    private commentService: CommentService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get("id");
    console.log(userId);

    this.userService.getUserById(userId!.toString())
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.postService.getAllPostsForOtherUser(userId!.toString())
      .subscribe(data => {
        console.log(data);
        this.posts = data;
        this.getImagesForPosts(this.posts);
        this.getCommentsForPosts(this.posts);
        this.isUserPostsLoaded = true;
      });

    this.imgService.getImageForOtherUser(userId!.toString())
      .subscribe((data: { imageBytes: File; }) => {
        this.userProfileImg = data.imageBytes;
      });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
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

  likePost(postId: number, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);

    if (!post.usersLiked?.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          post.likes! ++;
          post.usersLiked?.push(this.user.username);
          this.notificationService.showSnackBar('Liked!');
        });
    } else {
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          const index = post.usersLiked?.indexOf(this.user.username, 0);
          if (index! > -1) {
            post.likes! --;
            post.usersLiked?.splice(index!, 1);
            this.notificationService.showSnackBar('Like removed!');
          }
        });
    }
  }

  postComment(message: string, postId: number, postIndex: number): void {
    const post = this.posts[postIndex];

    console.log(post);
    this.commentService.createComment(postId, message).subscribe(data => {
      console.log(data);
      post.comments?.push(data);
      this.notificationService.showSnackBar('Comment published!');
    });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}

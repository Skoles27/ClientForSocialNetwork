import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/Post';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  public profileEditForm!: FormGroup;
  selectedFile!: File;
  postImg!: File;
  previewImgURL: any;

  constructor(
    private dialogRef: MatDialogRef<EditPostComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private imgService: ImageUploadService,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.profileEditForm = this.createPostForm();
    this.imgService.getImageForPost(this.data.post.id)
      .subscribe((data: { imageBytes: File; }) => {
        this.postImg = data.imageBytes;
      });
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      title: [
        this.data.post.title,
        Validators.compose([Validators.required])
      ],
      location: [
        this.data.post.location,
        Validators.compose([Validators.required])
      ],
      caption: [
        this.data.post.caption,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.postService.updatePost(this.data.post.id, this.updatePost(this.data.post))
      .subscribe(() => {
        this.notificationService.showSnackBar('Post update successfully');
        this.dialogRef.close();
      });
  }

  private updatePost(post: Post): Post {
    this.data.post.title = this.profileEditForm.value.title;
    this.data.post.location = this.profileEditForm.value.location;
    this.data.post.caption = this.profileEditForm.value.caption;
    return this.data.post;
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imgService.uploadImageForPost(this.data.post.id, this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Post Image updated successfully');
        });
    }
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

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

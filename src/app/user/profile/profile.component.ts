import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded = false;
  user!: User;
  selectedFile!: File;
  userProfileImg!: File;
  previewImgURL: any;

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private imgService: ImageUploadService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      });

    this.imgService.getImageForUser()
      .subscribe(data => {
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

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '600px';
    dialogUserEditConfig.height = '400px';
    dialogUserEditConfig.scrollStrategy?.disable;
    dialogUserEditConfig.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imgService.uploadImageForUser(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile Image updated successfully');
        });
    }
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public profileEditForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      name: [
        this.data.user.name,
        Validators.compose([Validators.required])
      ],
      lastName: [
        this.data.user.lastname,
        Validators.compose([Validators.required])
      ],
      bio: [
        this.data.user.bio,
        Validators.compose([Validators.required])
      ]
    });
  }

  submit(): void {
    this.userService.updateUser(this.updateUser())
      .subscribe(() => {
        this.notificationService.showSnackBar('User update successfully');
        this.dialogRef.close();
      })
  }

  private updateUser(): User {
    this.data.user.name = this.profileEditForm.value.name;
    this.data.user.lastName = this.profileEditForm.value.lastName;
    this.data.user.bio = this.profileEditForm.value.bio;
    return this.data.user;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

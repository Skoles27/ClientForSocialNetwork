import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.signUpForm = this.createSignUpForm();
  }

  createSignUpForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    console.log(this.signUpForm.value);

    this.authService.signUp({
      email: this.signUpForm.value.email,
      username: this.signUpForm.value.username,
      name: this.signUpForm.value.name,
      lastname: this.signUpForm.value.lastname,
      password: this.signUpForm.value.password,
      confirmPassword: this.signUpForm.value.confirmPassword
    }).subscribe(data => {
      console.log(data);
      this.notificationService.showSnackBar('Successfully signed up');
    }, error => {
      this.notificationService.showSnackBar('Something went wrong during sign up');
    })
  }
}

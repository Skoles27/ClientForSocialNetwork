import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { IndexComponent } from './layout/index/index.component';
import { AuthGuardService } from './helper/auth-guard.service';
import { ProfileComponent } from './user/profile/profile.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { AddPostComponent } from './user/add-post/add-post.component';
import { ShowUserComponent } from './user/show-user/show-user.component';


const routes: Routes = [
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'main', component: IndexComponent, canActivate: [AuthGuardService] },
  { path: 'showUser/:id', component: ShowUserComponent },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      { path: '', component: UserPostsComponent, canActivate: [AuthGuardService] },
      { path: 'add', component: AddPostComponent, canActivate: [AuthGuardService] }
    ]
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

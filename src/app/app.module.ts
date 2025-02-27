import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './helper/auth-interceptor.service';
import { authErrorInterceptorProvider } from './helper/error-interceptor.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { IndexComponent } from './layout/index/index.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddPostComponent } from './user/add-post/add-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowUserComponent } from './user/show-user/show-user.component';
import { SearchPostsPipe } from './pipes/search-posts.pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { EditPostComponent } from './user/edit-post/edit-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavigationComponent,
    IndexComponent,
    ProfileComponent,
    UserPostsComponent,
    EditUserComponent,
    AddPostComponent,
    ShowUserComponent,
    SearchPostsPipe,
    FooterComponent,
    EditPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    authInterceptorProviders,
    authErrorInterceptorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

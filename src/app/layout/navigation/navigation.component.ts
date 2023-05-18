import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isSignedIn = false;
  isDataLoaded = false;
  user!: User;

  constructor(private tokenService: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isSignedIn = !!this.tokenService.getToken();

    if (this.isSignedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isDataLoaded = true;
        })
    }
  }

  signOut(): void {
    this.tokenService.signOut();
    this.router.navigate(['/signIn']);
  }

}

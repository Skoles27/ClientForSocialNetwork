import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public signIn(user: { username: any; password: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signIn', {
      username: user.username,
      password: user.password
    });
  }

  public signUp(user: { email: any; username: any; name: any; lastname: any; password: any; confirmPassword: any; }): Observable<any> {
    return this.http.post(AUTH_API + 'signUp', {
      email: user.email,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}

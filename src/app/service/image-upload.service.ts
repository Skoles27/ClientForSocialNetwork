import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const IMG_API = 'http://localhost:8080/api/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) { }

  uploadImageForUser(file: File): Observable<any> {
    const img = new FormData();
    img.append('file', file);
    return this.http.post(IMG_API + 'upload', img);
  }

  uploadImageForPost(postId: number, file: File): Observable<any> {
    const img = new FormData();
    img.append('file', file);
    return this.http.post(IMG_API + postId + '/upload', img);
  }

  getImageForUser(): Observable<any> {
    return this.http.get(IMG_API + 'profileImage');
  }

  getImageForPost(postId: number): any {
    return this.http.get(IMG_API + postId + '/image');
  }

  getImageForOtherUser(userId: string): any {
    return this.http.get(IMG_API + userId + '/user/image');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

const POST_API = 'http://localhost:8080/api/post/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post): Observable<any> {
    return this.http.post(POST_API + 'create', post);
  }

  getAllPosts(): Observable<any> {
    return this.http.get(POST_API + 'all');
  }

  getAllPostsForUser(): Observable<any> {
    return this.http.get(POST_API + 'user/posts');
  }

  getAllPostsForOtherUser(userId: string): Observable<any> {
    return this.http.get(POST_API + userId + '/posts');
  }

  likePost(postId: number, username: string): Observable<any> {
    return this.http.post(POST_API + postId + '/' + username + '/like', null);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.post(POST_API + postId + '/delete', null);
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/base.service';
import { PostParameters } from '../models/post-parameters';
import { PostAdd } from '../models/post-add';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService {

  constructor(private http: HttpClient) {
    super();
   }

   getPagedPosts(postParameter?: any | PostParameters) {
    return this.http.get(`${this.apiUrlBase}/posts`, {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.yuan-chun.hateoas+json'
      }),
      observe: 'response',
      params: postParameter
    });
  }

  getPostById(id: number | string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrlBase}/posts/${id}`);
  }

  addPost(post: PostAdd) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/vnd.yuan-chun.post.create+json',
        'Accept': 'application/vnd.yuan-chun.hateoas+json'
      })
    };

    return this.http.post<Post>(`${this.apiUrlBase}/posts`, post, httpOptions);
  }  
}

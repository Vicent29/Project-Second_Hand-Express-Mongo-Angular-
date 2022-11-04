import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

const baseUrl = 'http://localhost:3000/product';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) { }

  add(slug: string, body: string): Observable<Comment> {
    return this.http.post<Comment>(`${baseUrl}/${slug}/comment`, { body: body })
  }

  getAll(slug: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${baseUrl}/${slug}/comment`)
      .pipe(map(data => data));
  }

  destroy(commentId: string, slug: string) {
    return this.http.delete(`${baseUrl}/${slug}/comment/${commentId}`);
  }

}
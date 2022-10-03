import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

const baseUrl = 'http://localhost:3000/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private http: HttpClient) { }
  getAll_Category(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

  get(id: any): Observable<Category> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  FindProductByCategory(slug: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/product/${slug}`);
    // getAll_Products(): Observable<Product[]> {
    //   return this.http.get<Product[]>(baseUrl);
    // }
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(id_cat: any): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}?id_cat=${id_cat}`);
  }
}

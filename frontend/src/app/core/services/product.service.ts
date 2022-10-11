import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

const baseUrl = 'http://localhost:3000/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private http: HttpClient) { }

  getAll_Products(params: any): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl + "?offset=" + params.offset);
    // return this.http.get<Product[]>(`${baseUrl}`,{params});
  }

  get(id: any): Observable<Product> {
    return this.http.get(`${baseUrl}/${id}`);
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

  findByTitle(prod_nom: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}?prod_nom=${prod_nom}`);
  }
}

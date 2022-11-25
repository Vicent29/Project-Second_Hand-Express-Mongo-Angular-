import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';

const baseUrl = 'http://localhost:8082/api/product';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  constructor(private http: HttpClient) { }

  getAll_Products(params: any): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl + "?offset=" + params.offset);
  }

  getListProduct(filters: any, params: any): Observable<Product[]> {
    let filt_str = JSON.stringify(filters);
    return this.http.get<Product[]>(`${baseUrl}?filters=${filt_str}&offset=${params.offset}`);
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

  favorite(slug: string): Observable<any> {
    return this.http.post(`${baseUrl}/${slug}/favorite`,null);
  }

  unfavorite(slug: string): Observable<Product> {
    return this.http.delete(`${baseUrl}/${slug}/favorite`);
  }

  all_products_user(email:String): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/products/${email}`);
  }//all_products_user

  fav_products_user(email:String): Observable<Product[]> {    
    return this.http.get<Product[]>(`${baseUrl}/favorite/${email}`);
  }//all_products_user

  
}

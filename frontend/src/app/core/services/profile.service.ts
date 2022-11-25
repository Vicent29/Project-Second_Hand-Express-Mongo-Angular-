import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:8082/api/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private http: HttpClient) {}

  get(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${baseUrl}`);
  }

  getOther(username: String) {
    return this.http.get<Profile>(`${baseUrl}/${username}`);
  }
  
  follow(email: string): Observable<any> {
    return this.http.post(`${baseUrl}/${email}/follow`, null);
  }

  unfollow(email: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${email}/follow`);
  }

  getfollows(): Observable<User[]>{
    return this.http.get<User[]>(`${baseUrl}/follows`);
  }

  getCountFoll(email: string){
    return this.http.get(`${baseUrl}/count/${email}`);
  }
  
}

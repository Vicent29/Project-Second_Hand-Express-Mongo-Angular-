import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, pipe } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';

import { JwtService } from './jwt.service';
import { User } from '../models';
import { map, distinctUntilChanged } from 'rxjs/operators';
const baseUrl = 'http://localhost:3000/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {    
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.http.get<User>(baseUrl).subscribe(
        users =>{ 
          let user = JSON.parse(JSON.stringify(users)) 
          this.setAuth(user.user)
        },
        err => this.purgeAuth()
      )
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    console.log(user.token);

    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: any, credentials: any): Observable<User> {
    const route = type === 'login' ? '/login' : '/register';
    // console.log(this.http.post<User>(baseUrl+route, {user : credentials}));

    return this.http.post<User>(baseUrl + route, { user: credentials }).pipe(
      map((data) => {
        this.setAuth(data);
        return data;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user: User): Observable<User> {
    return this.http.put<User>(baseUrl, { user })
    .pipe(
      map((data) => {        
      // Update the currentUser observable
        this.currentUserSubject.next(data);
        return data;
      })
    );
  }
}

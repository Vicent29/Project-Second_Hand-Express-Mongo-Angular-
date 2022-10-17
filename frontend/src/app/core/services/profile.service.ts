import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile.model';
import { map } from 'rxjs/operators';

const baseUrl = 'http://localhost:3001/profile'

@Injectable({
    providedIn: 'root'
})
export class ProfilesService {
    constructor(
        private http: HttpClient
    ) { }

    get(username: string): Observable<Profile> {
        return this.http.get<Profile>(`${baseUrl}/${username}`);
    }
}

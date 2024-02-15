import {Injectable} from '@angular/core';
import {Profile} from "../models/profile";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  getProfile(): Observable<Profile> {
    // return this.http.get<Profile>('/users/profile');

    return of({
      username: 'Timi',
      createdAt: new Date().toString(),
      email: 'timigherle@gmail.com',
      street: 'Tudor Vladimirescu nr 44 at 6 ap 40',
      city: 'oradea',
      county: 'bihor',
      phone: '0771719549',
      profileImageKey: ''
    })
  }

  updatePassword(values: UpdatePasswordDto): Observable<any> {
       return this.http.patch<any>('/users/password', values);
  }

  updateProfileDetails(values: UpdateProfileDetailsDto): Observable<any> {
    return this.http.patch<any>('/users/profile', values);
  }
}

export type UpdatePasswordDto = {
  oldPassword: string,
  newPassword: string
}

export type UpdateProfileDetailsDto = {
  username: string,
  email: string,
  phone: string,
  county: string,
  city: string,
  street: string,
}

import {Injectable} from '@angular/core';
import {Profile} from "../models/profile";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: BehaviorSubject<Profile | null> = new BehaviorSubject<Profile | null>(null);
  plm = this.currentUser.asObservable();

  constructor(
    private http: HttpClient
  ) {
  }

  get authorization(): string {
    return localStorage.getItem('token')!;
  }

  login(dto: any): Observable<any> {
    return this.http.post('api/user/login', dto);
  }

  signup(dto: any): Observable<any> {
    return this.http.post('api/user/signup', dto);
  }

  getProfile(): Observable<Profile | null> {
    console.log(this.currentUser.value, 'currentUser');
    // if (this.currentUser.value !== null) {
    //   return this.plm || of({} as Profile);
    // }

    const headers = {Authorization: this.authorization};

    return this.http.get<Profile>('api/user/profile', {headers: headers}).pipe(tap((data: Profile) => {
      this.currentUser.next(data);
      console.log(data, 'in GET');
    }));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUser.next(null);
  }

  updatePassword(values: UpdatePasswordDto): Observable<any> {
    const headers = {Authorization: this.authorization};

    return this.http.patch<any>('api/user/password', values, {headers: headers});
  }

  updateProfileDetails(values: UpdateProfileDetailsDto): Observable<any> {
    const headers = {Authorization: this.authorization};

    return this.http.patch<any>('api/user/profile-info', values, {headers: headers});
  }

  uploadProfileImage(value: File): Observable<any> {
    const headers = {Authorization: this.authorization};
    const fd: FormData = new FormData();
    fd.append('file', value, 'profile-pic');
    return this.http.post('api/user/profile-image', fd, {headers: headers});
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

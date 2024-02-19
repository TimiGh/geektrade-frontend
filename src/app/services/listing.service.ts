import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(
    private http: HttpClient
  ) { }

  createListing(dto: CreateListingDto): Observable<string> {
    return this.http.post<string>('/api/listings', dto);
  }

  addImageToListing(dto: any, listingId: string): Observable<any> {
    return this.http.post(`listings/${listingId}/images`, dto);
  }
}

export type CreateListingDto = {
  title: string;
  price: number;
  isNegotiable: boolean;
  category: string;
  quality: string;
  description: string;
}

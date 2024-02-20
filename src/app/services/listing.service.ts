import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Listing} from "../models/listing";

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(
    private http: HttpClient
  ) {
  }

  createListing(dto: CreateListingDto): Observable<string> {
    return this.http.post<string>('/api/listings', dto);
  }

  addImageToListing(dto: any, listingId: string): Observable<any> {
    return this.http.post(`listings/${listingId}/images`, dto);
  }

  getListing(listingId: string): Observable<Listing> {
    const headers = new HttpHeaders().set('noSpinner', 'true');

    return this.http.get<Listing>(`/api/listings/${listingId}`, {headers});
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

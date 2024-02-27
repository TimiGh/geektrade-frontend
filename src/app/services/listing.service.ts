import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Listing, Quality} from "../models/listing";
import {ListingView} from "../components/listing-card/listing-card.component";


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
    return this.http.post(`/api/listings/${listingId}/images`, dto);
  }

  getListing(listingId: string): Observable<Listing> {
    const headers = new HttpHeaders().set('noSpinner', 'true');

    return this.http.get<Listing>(`/api/listings/${listingId}`, {headers});
  }

  getPersonalListings(): Observable<PersonalListings> {
    // return this.http.get<PersonalListings>('/api/listings');

    return of(<PersonalListings>{
      content: [
        {
          listingId: '1',
          imageKey: null,
          title: 'SOmething something great value something',
          quality: Quality.NEW,
          price: 9000,
          isNegotiable: false,
          createdAt: new Date().toString(),
          categoryId: 2
        },
        {
          listingId: '2',
          imageKey: null,
          title: 'Test 78',
          quality: Quality.NEW,
          price: 15080,
          isNegotiable: false,
          createdAt: new Date().toString(),
          categoryId: 3
        },
        {
          listingId: '3',
          imageKey: null,
          title: 'Great quality super cheap product wow',
          quality: Quality.USED,
          price: 35900,
          isNegotiable: true,
          createdAt: new Date().toString(),
          categoryId: 1
        },
        {
          listingId: '4',
          imageKey: null,
          title: 'Custom made PC',
          quality: Quality.USED,
          price: 989999,
          isNegotiable: true,
          createdAt: new Date().toString(),
          categoryId: 7
        }
      ],
      pageable: {
        sort: {
          empty: true,
          unsorted: true,
          sorted: false
        },
        offset: 0,
        pageSize: 1000,
        pageNumber: 0,
        unpaged: false,
        paged: true
      },
      last: true,
      totalPages: 1,
      totalElements: 80,
      first: true,
      sort: {
        empty: true,
        unsorted: true,
        sorted: false
      },
      size: 1000,
      number: 0,
      numberOfElements: 80,
      empty: false
    });
  }
}

export type CreateListingDto = {
  title: string;
  price: number;
  isNegotiable: boolean;
  category: string;
  quality: Quality;
  description: string;
}

export type PersonalListings = {
  content: ListingView[];
  pageable: Pageable;
  sort: Sort;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export type Sort = {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export type Pageable = {
  sort: Sort;
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}

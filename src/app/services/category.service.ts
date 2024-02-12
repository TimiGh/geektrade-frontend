import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    // return this.http.get<Category[]>('api/categories');

    return of([
      {
        name: 'PC Games',
        id: 1
      },
      {
        name: 'Playstation Games',
        id: 2
      },
      {
        name: 'Xbox Games',
        id: 3
      },
      {
        name: 'Switch Games',
        id: 4
      },
      {
        name: 'Consoles & Accessories',
        id: 5
      },
      {
        name: 'Books & Guides',
        id: 6
      },
      {
        name: 'Vinyls',
        id: 7
      },
      {
        name: 'Collectibles',
        id: 8
      },
      {
        name: 'Services',
        id: 9
      }
    ])
  }
}

export interface Category {
  name: string;
  id: number;
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  localCategoryList: Category[];

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    // return this.http.get<Category[]>('api/categories');

    const mocks = [
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
    ];

    this.setLocalCategories(mocks);

    return of(mocks)
  }

  setLocalCategories(categories: Category[]): void {
    this.localCategoryList = categories;
  }

  getCategoryById(categoryId: number): Category | undefined {
    if (!this.localCategoryList) {
      this.getCategories().pipe(take(1)).subscribe(categories => this.localCategoryList ??= categories);
    }

    return this.localCategoryList.find(category => category.id === categoryId);
  }
}

export interface Category {
  name: string;
  id: number;
}

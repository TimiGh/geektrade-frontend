import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  localCategoryList: Category[];

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    if (this.localCategoryList) {
      return of(this.localCategoryList);
    }

    return this.http.get<Category[]>('api/categories').pipe(tap(res => this.localCategoryList = res));
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

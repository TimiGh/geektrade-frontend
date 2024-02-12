import { Component } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories$;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.categories$ = this.categoryService.getCategories();
  }

  navigate(categoryId: number): void {
    this.router.navigate(['search']).then();
  }
}

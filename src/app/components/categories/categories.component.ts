import { Component } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {slugify} from "../../utils/slugify";

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

  navigate(categoryName: string): void {
    const categorySlug = slugify(categoryName);
    this.router.navigate([`listings/${categorySlug}`]).then();
  }
}

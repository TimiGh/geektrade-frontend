import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Category, CategoryService} from "../../services/category.service";
import {slugify} from "../../utils/slugify";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {
  selectedCategoryFilter: string;
  categoryOptions: Category[] = [];
  protected readonly slugify = slugify;
  @Output() categorySelected: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.getCategoryParam();
    this.getCategoryOptions();
  }

  getCategoryParam(): void {
    this.selectedCategoryFilter = this.route.snapshot.paramMap.get('categorySlug')!;
  }

  getCategoryOptions(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => this.categoryOptions = categories);
  }

  setSelectedCategory(categoryId: number): void {
    const selectedCategory = this.categoryOptions.find(category => category.id === categoryId);
    this.selectedCategoryFilter = slugify(selectedCategory?.name!);
    this.categorySelected.emit(selectedCategory);
  }
}

import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent {
  selectedCategoryFilter: string;

  constructor(
    private route: ActivatedRoute
  ) {
    this.getCategoryParam();
  }

  getCategoryParam(): void {
    this.route.queryParams.subscribe(res => console.log(res, 'queryParams'))
  }
}

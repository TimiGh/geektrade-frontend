import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {slugify} from "../../utils/slugify";
import {Category, CategoryService} from "../../services/category.service";
import {ListingView} from "../../components/listing-card/listing-card.component";
import {ListingService, PersonalListings} from "../../services/listing.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-listings',
  templateUrl: './search-listings.component.html',
  styleUrls: ['./search-listings.component.scss']
})
export class SearchListingsComponent {
listings: ListingView[] = [];
currentCategory: Category;
sortForm;
constructor(
  private router: Router,
  private categoryService: CategoryService,
  private listingService: ListingService,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder
) {
  this.getListings();
  this.initializeCurrentCategory();

  this.sortForm = this.formBuilder.group({sort: ['']});
}

  getListings(): void {
    this.listingService.getListings().subscribe({
      next: (personalListingsDto: PersonalListings) => {
        this.listings = personalListingsDto.content;
      },
      error: () => {

      }
    });
  }
  goToListing(categoryId: number, listingId: string): void {
    this.router.navigate([`listings/${this.getCategorySlug(categoryId)}/${listingId}`]).then();
  }

  getCategorySlug(categoryId: number): string | void {
    const categoryName = this.categoryService.getCategoryById(categoryId)?.name;

    if (!categoryName) {
      return;
    }

    return slugify(categoryName)
  }

  setCurrentCategory(event: Category): void {
  this.currentCategory = event;
  }

  initializeCurrentCategory(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.currentCategory = categories.find(category => slugify(category.name) === this.route.snapshot.paramMap.get('categorySlug')!)!;
    });
  }

}

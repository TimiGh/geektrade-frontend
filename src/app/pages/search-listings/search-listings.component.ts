import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {slugify} from "../../utils/slugify";
import {Category, CategoryService} from "../../services/category.service";
import {ListingView} from "../../components/listing-card/listing-card.component";
import {ListingService, PersonalListings} from "../../services/listing.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-search-listings',
  templateUrl: './search-listings.component.html',
  styleUrls: ['./search-listings.component.scss']
})
export class SearchListingsComponent {
  shouldShowError: boolean = false;
  listings: ListingView[] = [];
  currentCategory: Category;
  sortForm;
  filters: {
    term?: string,
    categoryId?: number,
    priceMin?: number,
    priceMax?: number,
    quality?: string
  } = {};

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private listingService: ListingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.initializeCurrentCategory();
    this.getListings();

    this.sortForm = this.formBuilder.group({sort: ['']});
  }

  getListings(): void {
    this.listingService.getListings(this.filters).subscribe({
      next: (personalListingsDto: PersonalListings) => {
        this.listings = personalListingsDto.content;
        this.shouldShowError = personalListingsDto.content.length < 1;
      },
      error: () => {
        this.shouldShowError = true;
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
    this.router.navigate([`listings/${this.getCategorySlug(event.id)}`]).then(() => {
      this.filters = {};
      this.initializeCurrentCategory();
      this.getListings();
    });
  }

  initializeCurrentCategory(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      const categorySlug = this.route.snapshot.paramMap.get('categorySlug');
      if (categorySlug) {
        this.currentCategory = categories.find(category => slugify(category.name) === categorySlug)!;
        this.filters.categoryId = this.currentCategory.id;
      }
    });
  }

  setPrice($event: { priceMin?: number, priceMax?: number }) {
    this.filters.priceMin = $event.priceMin;
    this.filters.priceMax = $event.priceMax;
   this.getListings();
  }

  setQuality($event: {quality: 'used' | 'new', value: boolean}): void {
    console.log($event);
    if (!$event.value) {
      if (this.filters.hasOwnProperty('quality')) {
        delete this.filters.quality;
      }
    } else {
      this.filters.quality = $event.quality;
    }
    this.getListings();
  }
}

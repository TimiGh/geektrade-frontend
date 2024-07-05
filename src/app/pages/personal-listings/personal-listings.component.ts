import {Component} from '@angular/core';
import {ListingService, PersonalListings} from "../../services/listing.service";
import {ListingView} from "../../components/listing-card/listing-card.component";
import {Quality} from "../../models/listing";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {slugify} from "../../utils/slugify";

@Component({
  selector: 'app-personal-listings',
  templateUrl: './personal-listings.component.html',
  styleUrls: ['./personal-listings.component.scss']
})
export class PersonalListingsComponent {
  personalListings: ListingView[];
  protected quality = Quality;

  constructor(
    private listingService: ListingService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.getPersonalListings();
  }

  getPersonalListings(): void {
    this.listingService.getPersonalListings().subscribe({
      next: (personalListingsDto: PersonalListings) => {
        this.personalListings = personalListingsDto.content;
      },
      error: () => {

      }
    });
  }

  goToListing(categoryId: number, listingId: number): void {
    this.router.navigate([`listings/${this.getCategorySlug(categoryId)}/${listingId}`]).then();
  }

  getCategorySlug(categoryId: number): string | void {
    const categoryName = this.categoryService.getCategoryById(categoryId)?.name;

    if (!categoryName) {
      return;
    }

    return slugify(categoryName)
  }

}

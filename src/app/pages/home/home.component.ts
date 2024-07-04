import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ListingService} from "../../services/listing.service";
import {slugify} from "../../utils/slugify";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: any[] = [];
  discounted: any[] = []
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private listingService: ListingService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.getCarouselListings();
  }

  getCarouselListings(): void {
    this.listingService.getCarouselListings().subscribe(res => {
      this.products = res.content;
      this.discounted = res.content.slice().reverse();
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
}

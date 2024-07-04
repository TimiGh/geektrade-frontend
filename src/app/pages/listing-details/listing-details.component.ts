import {Component} from '@angular/core';
import {ActivatedRoute, Data} from "@angular/router";
import {Listing} from "../../models/listing";
import {CustomDateFormats} from "../../utils/date-formats";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent {
  listing: Listing;
  localImages: LocalImage[] = [];
  dateFormat = CustomDateFormats.DAY_LITERAL_MONTH_YEAR;
  defaultProfileImagePath = 'assets/images/user-icon.png';
  placeholderImagePath =  'assets/images/placeholder-image.png';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    this.route.data.subscribe((data: Data) => {
      this.listing = data['listing'];
      this.localImages = this.listing.imageKeys.map((imageKey: string, index: number) => {
        return {
          imageKey: imageKey !== '' ? imageKey : this.placeholderImagePath,
          selected: index === 0
        }
      });
    })
    window.scrollTo(0, 0);


  }

  getCategoryName(): string {
    return this.categoryService.getCategoryById(this.listing.categoryId)?.name!;
  }

  getSelectedImage(): string {
    // return this.localImages.find(image => image.selected && image.imageKey !== '')?.imageKey ||this.placeholderImagePath;
    return this.localImages.find(image => image.selected && image.imageKey !== '') ? 'assets/mocks/'+this.listing.id+'.jpg' : this.placeholderImagePath;
  }
}

export type LocalImage = {
  imageKey: string;
  selected: boolean;
}

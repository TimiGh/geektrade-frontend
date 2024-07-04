import {Component, Input} from '@angular/core';
import {Quality} from "../../models/listing";
import {CustomDateFormats} from "../../utils/date-formats";

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss']
})
export class ListingCardComponent {
  @Input() listing: ListingView;
  protected readonly Quality = Quality;
  dateFormat: CustomDateFormats.DAY_LITERAL_MONTH_YEAR;
}

export type ListingView = {
  id?: number;
  listingId: string;
  imageKey: string | null;
  title: string;
  quality: Quality;
  price: number;
  isNegotiable: boolean;
  createdAt?: string;
  categoryId: number;
  primaryImageId?: number;
}

export type CreateListingDto = {
  title: string;
  price: number;
  isNegotiable: boolean;
  category: string;
  quality: Quality;
  description: string;
}

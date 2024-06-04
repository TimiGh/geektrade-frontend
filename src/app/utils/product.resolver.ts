import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Listing, Quality} from "../models/listing";
import {ListingService} from "../services/listing.service";
import {Observable, of} from "rxjs";

@Injectable()
export class ListingResolver implements Resolve<Listing> {
  constructor(
    private listingService: ListingService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Listing> {
    // return of({
    //   title: 'PlayStation 5 Pro Limited Edition',
    //   price: 350025,
    //   isNegotiable: true,
    //   categoryId: '5',
    //   categoryName: 'Consoles & Accessories',
    //   quality: Quality.NEW,
    //   description: 'For Sale: PlayStation 5 Console - Barely Used, Like New Condition\n' +
    //     '\n' +
    //     'Experience next-level gaming with the PlayStation 5, now available for purchase. This console has been meticulously maintained and shows minimal signs of use, practically in mint condition. The PS5 offers lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    //   imageKeys: ['', '' , '', ''],
    //   createdAt: new Date().toString(),
    //   seenCount: 788,
    //   sellerProfile: {
    //     name: 'George Georgescu Marin',
    //     phone: '0771719549',
    //     profileImageKey: '',
    //     county: 'Bihor',
    //     city: 'Oradea'
    //   }
    // })
    return this.listingService.getListing(route.paramMap.get('listingId')!);
  }
}

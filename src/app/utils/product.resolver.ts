import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Listing} from "../models/listing";
import {ListingService} from "../services/listing.service";
import {Observable, of} from "rxjs";

@Injectable()
export class ListingResolver implements Resolve<Listing> {
  constructor(
    private listingService: ListingService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Listing> {
    return of({
      title: 'PlayStation 5 Pro Limited Edition',
      price: 350025,
      isNegotiable: true,
      categoryId: '5',
      categoryName: 'Consoles & Accessories',
      quality: 'new',
      description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu magna posuere, efficitur tortor at, sodales felis. Nulla tincidunt lacus non dictum malesuada. Morbi interdum felis vel nulla elementum, a commodo turpis tincidunt. Donec viverra est quis lacus malesuada, ut iaculis odio pellentesque. Fusce sapien arcu, lobortis lobortis nunc nec, mollis mollis nisi. Vestibulum blandit massa ex, et vulputate purus ultrices non. In aliquet molestie arcu. Quisque elementum laoreet sapien, a suscipit libero dapibus ac.\n' +
        '\n' +
        'Maecenas ut quam mi. Etiam tempus massa eget nisi placerat pellentesque. Phasellus scelerisque sapien et sagittis molestie. Maecenas ut fringilla diam, ut malesuada sem. Vivamus ut velit quis lacus lacinia posuere at sed sem. Vestibulum nec neque quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum sed neque ac elit ultrices tempus. Sed velit nisi, mollis et bibendum a, scelerisque vitae purus. Integer purus sapien, fermentum vitae scelerisque fringilla, suscipit elementum nunc. Aenean viverra at ante ut varius. Pellentesque eu accumsan velit. Phasellus vitae eleifend dolor.\n' +
        '\n' +
        'Etiam ultrices interdum arcu, vel ornare nisi tempus a. Pellentesque dictum mi purus, quis porta diam tempus nec. Proin dapibus facilisis mi in porta. Morbi auctor sem vitae arcu placerat sodales. Praesent consequat, nunc sed efficitur mollis, lacus mi tincidunt ligula, in pretium metus nisl ut odio. Suspendisse porttitor quam eget felis placerat auctor. Pellentesque feugiat auctor sagittis. Duis dapibus ultricies orci, et laoreet tortor lobortis nec. In eget lorem auctor velit aliquam fermentum in id ipsum. Maecenas felis leo, rutrum ut rutrum ac, feugiat at neque. Donec rhoncus ligula non felis tempus laoreet convallis non leo. Pellentesque ullamcorper dictum tincidunt. Nulla gravida tellus et diam sodales, at egestas mi porta. ',
      imageKeys: ['', '' , '', ''],
      createdAt: new Date().toString(),
      seenCount: 788,
      sellerProfile: {
        name: 'George Georgescu Popescu Marin',
        phone: '0771719549',
        profileImageKey: '',
        county: 'Bihor',
        city: 'Oradea'
      }
    })
    // return this.listingService.getListing(route.paramMap.get('listingId')!);
  }
}

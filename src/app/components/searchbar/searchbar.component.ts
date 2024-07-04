import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ListingService, PersonalListings} from "../../services/listing.service";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Category, CategoryService} from "../../services/category.service";
import {slugify} from "../../utils/slugify";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
    searchForm: FormGroup;
    options$: Observable<PersonalListings>;

  constructor(
    private listingService: ListingService,
    private router: Router,
    private categoryService: CategoryService
  ) {

    this.searchForm = new FormGroup({
      term: new FormControl(''),
    })


    this.searchForm.get('term')!.valueChanges
      .subscribe(value => {
        if (value && value.trim !== '') {
          const dto = {term: value};
          this.options$ = this.listingService.getListings(dto).pipe(map((listings: PersonalListings) => {listings.content.slice(0, 5); return listings}))
        }
      })
  }

  goToListingDetailPage(categoryId: number, id?: number) {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      const categorySlug = slugify(categories.find(category => category.id === categoryId)?.name!);
      this.router.navigate([`listings/${categorySlug}/${id}`])
    });
  }
}

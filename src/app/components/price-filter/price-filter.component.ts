import {Component} from '@angular/core';
import {slugify} from "../../utils/slugify";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent {
  priceForm;
  protected readonly slugify = slugify;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.priceForm = this.formBuilder.group({
        minPrice: [''],
        maxPrice: ['']
      }
    );
  }
}

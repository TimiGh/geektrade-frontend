import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent {
  priceForm;
  @Output() priceChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.priceForm = this.formBuilder.group({
        priceMin: [''],
        priceMax: ['']
      }
    );
  }

  setPrice() {
    const filter: {priceMin?: number, priceMax?: number} = {};

    if (this.priceForm.get('priceMin')!.value && this.priceForm.get('priceMin')!.value !== '') {
      filter.priceMin = +this.priceForm.get('priceMin')!.value!*100;
    }

    if (this.priceForm.get('priceMax')!.value && this.priceForm.get('priceMax')!.value !== '') {
      filter.priceMax = +this.priceForm.get('priceMax')!.value!*100;
    }
    this.priceChanged.emit(filter);
  }
}

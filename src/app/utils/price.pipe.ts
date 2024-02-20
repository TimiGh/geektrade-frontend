import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'price'})
export class PricePipe implements PipeTransform {
  transform(price: number, styled: boolean = true): string {
    if (!price || isNaN(price)) {
      return 'N/A';
    }

    const parts: string[] = (price / 100).toFixed(2).split('.');

    if (parts[1] === '00') {
      return parts[0];
    }

    if (!styled) {
      return `${parts[0]},${parts[1]}`;
    }

    return `$ ${parts[0]}<sup>${parts[1]}</sup>`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$', decimalPlaces: number = 2): string {
    if (isNaN(value)) {
      return `${currencySymbol}0.00`;
    }
    return `${currencySymbol}${value.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

}

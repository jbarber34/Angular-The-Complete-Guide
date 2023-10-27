import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: any, reverse: boolean): any {
    if (!reverse) {
      return value;
    } else {
      return value.split('').reverse().join('');
    }
  }
}

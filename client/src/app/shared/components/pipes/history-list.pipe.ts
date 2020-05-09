import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../interfaces';

@Pipe({
  name: 'searchO'
})

export class HistoryListPipe implements PipeTransform {
  transform(orders: Order[], value) {
    if (value[0] === value[1] || value[0] === '') {
      return orders.filter(order => {
        return (order.shopBuyer.includes(value[0]))
      })
    } else {
      return orders.filter(order => {
        let a = order.shopBuyer.includes(value[1])
        a = !a
        return a
      })
    }

  }
}

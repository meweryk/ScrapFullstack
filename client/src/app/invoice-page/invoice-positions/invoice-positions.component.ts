import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { OrderPosition } from 'src/app/shared/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceServise } from '../invoice.service';
import { MaterialService } from 'src/app/shared/classes/material.service';
;

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.css']
})
export class InvoicePositionsComponent implements OnInit {

  @Input() list: OrderPosition[]
  positions$: Observable<OrderPosition[]>
  flag: boolean = false
  allInvoice: any
  fractionList: any = ['кусок', 'стружка', 'скрап', 'сепарация', 'выштамповка', 'мехпорезка']
  rankOpt = ['', 'тонн', 'штук']

  constructor(private invoice: InvoiceServise) { }

  ngOnInit() {
    this.allInvoice = this.invoice
    this.positions$ = of(this.list).pipe(
      map(pos => {
        return pos.map(p => {
          !p.fraction ? p.fraction = '' : p.fraction
          !p.rank ? p.rank = '' : p.rank
          !p.trash ? p.trash = null : p.trash
          !p.trashStap ? p.trashStap = '' : p.trashStap
          !p.quantityNoTrash ? p.quantityNoTrash = null : p.quantityNoTrash
          return p
        })
      }))
  }

  addToInvoice(position: OrderPosition) {
    MaterialService.toast(`Добавлено x${position.quantity}${position.rank}`)
    this.invoice.add(position)
    position.flag = true
  }

  changeInvoice(position: OrderPosition) {
    MaterialService.toast(`Позиция ${position.name} готова к изменению`)
    position.flag = false
  }

  deleteInvoice(ev: any, position: OrderPosition) {
    position.flag ? this.invoice.remove(position) : position.flag = false

    //this.positions$.pipe()
    this.positions$ = of(this.list).pipe(
      map(pos => {
        const idx = pos.findIndex(p => p._id === position._id)
        pos.splice(idx, 1)
        return pos
      }))

    MaterialService.toast(`Позиция ${position.name} удалена`)
  }

}

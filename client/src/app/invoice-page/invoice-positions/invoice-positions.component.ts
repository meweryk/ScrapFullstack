import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { OrderPosition } from 'src/app/shared/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceServise } from '../invoice.service';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.css']
})
export class InvoicePositionsComponent implements OnInit {

  @Input() list: OrderPosition[]
  positions$: Observable<OrderPosition[]>
  flag: boolean = false
  fractionList: any = ['кусок', 'стружка', 'скрап', 'сепарация', 'выштамповка', 'мехпорезка']
  rankOpt = ['', 'тонн', 'штук']

  constructor(private invoice: InvoiceServise) { }

  ngOnInit() {
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
    this.invoice.add(position)
  }

}

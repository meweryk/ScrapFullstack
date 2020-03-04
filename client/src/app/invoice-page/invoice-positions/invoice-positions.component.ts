import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

  @Output() updateSave = new EventEmitter<any>()
  @Input() list: OrderPosition[]
  @Input() allInvoice: any

  positions$: Observable<OrderPosition[]>
  flag: boolean = false
  fractionList: any = ['кусок', 'стружка', 'скрап', 'сепарация', 'выштамповка', 'мехпорезка']
  rankOpt = ['', 'тонн', 'штук']
  orderListLength: number //количество позиций в заказе
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
    this.orderListLength = this.list.length
  }

  addToInvoice(position: OrderPosition) {
    this.invoice.add(position)
    position.flag = true
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
    MaterialService.toast(`Добавлено x${position.quantity}${position.rank}`)
  }

  changeInvoice(position: OrderPosition) {
    this.invoice.remove(position)
    position.flag = false
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
    MaterialService.toast(`Позиция ${position.name} готова к изменению`)
  }

  private activSave(deliveryPosList: number, orderListLength: number) {
    let formSave: boolean = (deliveryPosList != orderListLength) || (deliveryPosList === 0)
    this.updateSave.emit(formSave)
    console.log(formSave)
  }

  deleteInvoice(position: OrderPosition) {
    position.flag ? this.invoice.remove(position) : position.flag = false

    this.positions$ = of(this.list).pipe(
      map(pos => {
        const idx = pos.findIndex(p => p._id === position._id)
        pos.splice(idx, 1)
        return pos
      }))
    this.orderListLength--
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)

    MaterialService.toast(`Позиция ${position.name} удалена`)
  }

  addPosition() {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: '',
      fraction: '',
      quantity: null,
      rank: '',
      trash: null,
      trashStap: '',
      cost: 1,
      quantityNoTrash: null,
      _id: '',
      flag: false
    })
    this.positions$ = of(this.list)
      .pipe(
        map(pos => {
          pos.push(orderPosition)
          return pos
        })
      )
    this.orderListLength++
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
  }

}

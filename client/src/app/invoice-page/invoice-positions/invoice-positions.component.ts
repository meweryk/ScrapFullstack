import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DeliveryPosition } from 'src/app/shared/interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvoiceServise } from '../invoice.service';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.css']
})
export class InvoicePositionsComponent implements OnInit {

  @Output() updateSave = new EventEmitter<any>()
  @Input() list: any[]

  positions$: Observable<DeliveryPosition[]>
  flag: boolean = false
  fractionList: any = ['кусок', 'стружка', 'скрап', 'сепарация', 'выштамповка', 'мехпорезка']
  rankOpt = ['', 'тонн', 'штук']
  orderListLength: number //количество позиций в заказе
  allInvoice: any

  constructor(private invoice: InvoiceServise) { }

  ngOnInit() {
    this.positions$ = of(this.list).pipe(
      map(pos => {
        return pos.map(p => {
          p.quantity = p.quantity
          p.fraction = ''
          !p.rank ? p.rank = '' : p.rank
          p.trash = null
          p.trashStap = ''
          p.quantityNoTrash = null
          p.flag = false
          return p
        })
      }))
    this.orderListLength = this.list.length
    this.allInvoice = this.invoice
  }

  addToInvoice(position: DeliveryPosition) {
    this.invoice.add(position)
    position.flag = true
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
    MaterialService.toast(`Добавлено x${position.quantity}${position.rank}`)
  }

  changeInvoice(position: DeliveryPosition) {
    this.invoice.remove(position)
    position.flag = false
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
    MaterialService.toast(`Позиция ${position.name} готова к изменению`)
  }

  private activSave(deliveryPosList: number, orderListLength: number) {
    let formSave: boolean = (deliveryPosList != orderListLength) || (deliveryPosList === 0)
    this.updateSave.emit(formSave)
  }

  deleteInvoice(position: DeliveryPosition) {
    position.flag ? this.invoice.remove(position) : position.flag = false

    this.positions$ = of(this.list).pipe(
      map(pos => {
        const idx = pos.findIndex(p => p._id === position._id && p.name === position.name)
        pos.splice(idx, 1)
        return pos
      }))
    this.orderListLength--
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)

    MaterialService.toast(`Позиция ${position.name} удалена`)
  }

  addPosition() {
    const deliveryPosition: DeliveryPosition = Object.assign({}, {
      name: '',
      quantity: null,
      rank: '',
      cost: 1,
      _id: '',
      flag: false,
      fraction: '',
      trash: null,
      trashStap: '',
      quantityNoTrash: null
    })
    this.positions$ = of(this.list)
      .pipe(
        map(pos => {
          pos.push(deliveryPosition)
          return pos
        })
      )
    this.orderListLength++
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
  }

}

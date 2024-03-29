import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, OnDestroy, OnChanges } from '@angular/core';
import { Order, OrderPosition, Delivery, DeliveryPosition } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Validators, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

import { DeliveriesServise } from '../shared/services/deliveries.service';
import { InvoiceServise } from './invoice.service';
import { OrdersServise } from '../shared/services/orders.service';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css'],
  providers: [InvoiceServise]
})
export class InvoicePageComponent implements OnInit, OnChanges, OnDestroy {
  @Input() deliveryOrder: Order
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  width: number
  deliveryId = null
  newOrder = null
  shop: string
  nicname: string
  list: any[] = []
  formSave: boolean = true //если не заполнены позиции

  loader = false

  form: UntypedFormGroup = this._formBuilder.group({
    order: '',
    shop: ['', Validators.required],
    shopBuyer: ['', Validators.required],
    train: [null, Validators.required],
    waybill: [null, Validators.required],
    imageSrc: null
  })

  constructor(private _formBuilder: UntypedFormBuilder,
    private auth: AuthService,
    private invoice: InvoiceServise,
    private deliveriesService: DeliveriesServise,
    private ordersService: OrdersServise) { }

  ngOnInit() {
    this.loader = false
    this.width = window.innerWidth * 0.9
    this.shop = this.auth.getShop()
    this.nicname = this.auth.getNicname()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const w = event.target.innerWidth
    this.width = 0.95 * w //ширина модального окна
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnChanges() {
    if (this.deliveryOrder) {
      this.invoice.clear()
      this.onAddDelivery()
    }
  }

  onCancel() {
    this.modal.close()
  }

  ngOnDestroy() {
    this.invoice.clear()
    this.modal.destroy()
  }

  private onAddDelivery() {
    this.formSave = true
    this.deliveryId = null
    this.newOrder = null

    //создание глубокой копии массива позиций для автономной работы
    let newlist = this.deliveryOrder.list.filter(order => order.shopSeller === this.shop)
    let key: string | number
    for (key in newlist) {
      this.list[key] = JSON.parse(JSON.stringify(newlist[key]))
    }

    this.form.reset({
      order: this.deliveryOrder.order,
      shop: this.shop,
      shopBuyer: this.deliveryOrder.shopBuyer,
      train: null,
      waybill: null,
      imageSrc: null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  updateButton(formSave: boolean) {
    this.formSave = formSave //активация сохранения всей формы при валидности позиций
  }

  submit() {
    this.form.setValue
    this.form.disable()
    this.loader = true

    const delivery: Delivery = {
      orderId: this.deliveryOrder._id,
      order: this.form.value.order,
      shopBuyer: this.form.value.shopBuyer,
      shop: this.form.value.shop,
      train: this.form.value.train,
      waybill: this.form.value.waybill,
      list: this.invoice.list.map(pos => {
        delete pos._id
        return pos
      })
    }

    this.deliveriesService.create(delivery).subscribe(
      newDelivery => {
        MaterialService.toast(`Поставка по накладной №${newDelivery.waybill} создана`)
        if (this.deliveryOrder._id) {
          this.update(newDelivery._id, newDelivery.waybill, newDelivery.order, newDelivery.train)
        }
        this.invoice.clear()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
        this.loader = false
      },
      () => {
        this.modal.close()
        this.form.enable()
        this.loader = false
      }
    )
  }

  private update(deliveryId: string, waybill: string, order: number, train: string) {
    if (this.deliveryOrder.order != order) {
      this.deliveryOrder.order = order
      this.newOrder = order
    }
    const objectFlag = Object.assign({}, {
      _id: this.deliveryOrder._id,
      deliveryId: deliveryId,
      waybill: waybill,
      train: train,
      order: this.newOrder,
      view: this.deliveryOrder.view,
      send: 'f',
      got: this.deliveryOrder.got
    })
    this.ordersService.update(objectFlag).subscribe((order: Order) => {
      this.deliveryOrder.deliveryId = order.deliveryId
      this.deliveryOrder.waybill = order.waybill
      this.deliveryOrder.train = order.train
      this.deliveryOrder.order = order.order
      this.deliveryOrder.send = order.send
      MaterialService.toast(`Заказ ${order.order} отправлен поставщиком ${this.shop}`)
    },
      error => MaterialService.toast(error.error.message),
    )
  }

}

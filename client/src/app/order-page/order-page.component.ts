import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { OrderPosition, Order } from '../shared/interfaces';
import { OrdersServise } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  isRoot: boolean
  modal: MaterialInstance
  oSub: Subscription
  pending = false
  allPosition: any

  comment: string = ''
  phone: string = ''
  nicname: string = ''
  email: string = ''
  shop: string = ''
  id: string = ''

  constructor(private router: Router,
    private order: OrderService,
    private ordersService: OrdersServise,
    private auth: AuthService) { }

  ngOnInit() {
    this.nicname = this.auth.getNicname()
    this.phone = this.auth.getPhone() ? this.auth.getPhone() : ''
    this.email = this.auth.getEmail()
    this.shop = this.auth.getShop() ? this.auth.getShop() : ''
    this.id = this.auth.getId()

    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
    this.allPosition = this.order

  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  open() {
    this.modal.open()
  }

  cencel() {
    this.modal.close()
  }

  submit() {
    this.pending = true

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      }),
      comment: this.comment,
      nicname: this.nicname, //имя покупателя
      shopBuyer: this.shop, //магазин покупателя
      userBuyer: this.id //id покупателя
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
        this.comment = ''
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

}

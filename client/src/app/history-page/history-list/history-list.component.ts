import { Component, Input, ViewChild, ElementRef, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { Order, User } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('select') selectRef: ElementRef

  shop: string
  aSub: Subscription

  selectedOrder: Order
  modal: MaterialInstance
  select: MaterialInstance

  searchOrd = ''

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.aSub = this.auth.getById().subscribe((data: User) => { this.shop = data.shop })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    this.select = MaterialService.initFormSelect(this.selectRef)
  }

  computePrice(order: Order): number {
    return +order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0).toFixed(2)
  }

  computeWeight(order: Order) {
    return +order.list.reduce((total, item) => {
      return total += item.quantity
    }, 0).toFixed(3)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }

}

import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersServise } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order, Filter } from '../shared/interfaces';

const STEP = 6

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip1') tooltip1Ref: ElementRef
  @ViewChild('tooltip2') tooltip2Ref: ElementRef
  tooltip1: MaterialInstance
  tooltip2: MaterialInstance
  oSub: Subscription
  isFilterVisible = false
  orders: Order[] = []
  filter: Filter = {}

  offset = 0
  limit = STEP

  loading = false
  reloading = false
  noMoreOrders = false

  constructor(private ordersService: OrdersServise) { }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
      this.noMoreOrders = orders.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  ngOnDestroy() {
    this.tooltip1.destroy()
    this.tooltip2.destroy()
    this.oSub.unsubscribe()
  }

  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()

  }

  ngAfterViewInit() {
    this.tooltip1 = MaterialService.initTooltip(this.tooltip1Ref)
    this.tooltip2 = MaterialService.initTooltip(this.tooltip2Ref)
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

  updateHistoryList() {
    this.orders = []
    this.offset = 0
    this.reloading = true
    this.fetch()   
  }
}

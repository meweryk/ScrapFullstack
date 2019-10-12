import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersServise } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from '../shared/interfaces';

const STEP = 2

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip', { static: false }) tooltipRef: ElementRef
  tooltip: MaterialInstance
  oSub: Subscription
  isFilterVisible = false
  orders: Order[] = []

  offset = 0
  limit = STEP

  loading = false
  reloading = false

  constructor(private ordersService: OrdersServise) { }

  ngOnInit() {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    const params = {
      offset: this.offset,
      limit: this.limit
    }
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
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
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

}

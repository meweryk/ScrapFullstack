import { Component, OnInit, Input } from '@angular/core';
import { OrderPosition, DeliveryPosition } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.css']
})
export class InvoicePositionsComponent implements OnInit {

  @Input() list: OrderPosition[]
  position: DeliveryPosition

  constructor() { }

  ngOnInit() {
    this.list = this.list
  }

}

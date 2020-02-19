import { Component, OnInit, Input } from '@angular/core';
import { OrderPosition } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.css']
})
export class InvoicePositionsComponent implements OnInit {

  @Input() list: OrderPosition[]
  positions: OrderPosition[]

  constructor() { }

  ngOnInit() {
    this.positions = this.list
  }

  addToInvoice() { }

}

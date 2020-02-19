import { Component, OnInit, Input } from '@angular/core';
import { OrderPosition, DeliveryPosition } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.css']
})
export class InvoicePositionsComponent implements OnInit {

  @Input() list: OrderPosition[]
  position$: Observable<OrderPosition[]>

  constructor() { }

  ngOnInit() { }

}

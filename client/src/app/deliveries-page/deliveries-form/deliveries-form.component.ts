import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deliveries-form',
  templateUrl: './deliveries-form.component.html',
  styleUrls: ['./deliveries-form.component.css']
})
export class DeliveriesFormComponent implements OnInit {

  selectedOrder: {
    order: number,
    shopBuyer: string,
    nicname: string,
    date: Date,
    list: []
  }

  workOrder = true
  constructor() { }

  ngOnInit() {
  }

  computeWeight() { }

  computePrice() { }

  closeModal() { }
}

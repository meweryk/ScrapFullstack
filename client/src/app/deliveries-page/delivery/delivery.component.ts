import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  order: string

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.order = this.route.snapshot.params['order']
  }

}

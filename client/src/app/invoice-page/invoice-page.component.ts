import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Order, OrderPosition, DeliveryPosition, Delivery } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { InvoiceServise } from './invoice.service';
import { DeliveriesServise } from '../shared/services/deliveries.service';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css'],
  providers: [InvoiceServise]
})
export class InvoicePageComponent implements OnInit {
  @Input() deliveryOrder: Order
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  deliveryId = null
  shop: string
  nicname: string
  list: OrderPosition[] = []

  form: FormGroup = this._formBuilder.group({
    order: '',
    shopSend: ['', Validators.required],
    shopHost: ['', Validators.required],
    train: [null, Validators.required],
    waybill: [null, Validators.required],
    imageSrc: null
  })


  constructor(private _formBuilder: FormBuilder,
    private auth: AuthService,
    private invoice: InvoiceServise,
    private deliveriesService: DeliveriesServise) { }

  ngOnInit() {
    this.shop = this.auth.getShop()
    this.nicname = this.auth.getNicname()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnChanges() {
    if (this.deliveryOrder) {
      this.onAddDelivery()
    }
  }

  onCancel() {
    this.modal.close()
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  private onAddDelivery() {
    this.deliveryId = null
    this.list = this.deliveryOrder.list.filter(order => order.shopSeller === this.shop)
    this.form.reset({
      order: this.deliveryOrder.order,
      shopSend: this.shop,
      shopHost: this.deliveryOrder.shopBuyer,
      train: null,
      waybill: null,
      imageSrc: null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  /*onSubmit() {
    //this.form.setValue
    //this.form.disable()
    this.modal.close()
  }*/

  submit() {
    this.modal.close()

    /*const delivery: Delivery = {
      
    }

    this.deliveriesService.create()*/

  }



}

import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Order, OrderPosition } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css']
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
    private auth: AuthService) { }

  ngOnInit() {
    this.shop = this.auth.getShop()
    this.nicname = this.auth.getNicname()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
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
    this.list = this.deliveryOrder.list
    this.deliveryId = null
    this.form.reset({
      gi
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

  onSubmit() {
    this.form.setValue
    this.form.disable()
    this.modal.close()
  }

}

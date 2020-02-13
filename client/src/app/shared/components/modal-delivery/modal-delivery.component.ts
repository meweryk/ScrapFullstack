import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../classes/material.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-modal-delivery',
  templateUrl: './modal-delivery.component.html',
  styleUrls: ['./modal-delivery.component.css']
})
export class ModalDeliveryComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() deliveryOrder: Order
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  deliveryId = null
  shop: string
  nicname: string

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

  onAddDelivery() {
    this.deliveryId = null
    this.form.reset({
      order: this.deliveryOrder.order,
      shopSend: this.shop,
      shopHost: this.deliveryOrder.shopBuyer,
      train: null,
      waybill: null,
      imageSrc: null
    })
    this.modal.open()
    this.deliveryOrder = null
    MaterialService.updateTextInputs()
  }

  onSubmit() {
    this.form.setValue
    this.form.disable()
    this.modal.close()
  }

}

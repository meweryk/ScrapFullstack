import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../classes/material.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Order } from '../../interfaces';

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

  form: FormGroup = this._formBuilder.group({
    order: '',
    shopSend: ['', Validators.required],
    shopHost: ['', Validators.required],
    train: [null, Validators.required],
    waybill: [null, Validators.required],
    imageSrc: null
  })


  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() { }

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

  onAddDelivery() {
    this.deliveryId = null
    this.form.reset({
      order: this.deliveryOrder.order,
      shopSend: '',
      shopHost: this.deliveryOrder.shopBuyer,
      train: null,
      waybill: null,
      imageSrc: null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onSubmit() { }

}

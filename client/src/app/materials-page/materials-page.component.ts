import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MaterialsService } from '../shared/services/materials.service';
import { Material, MaterialList } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-materials-page',
  templateUrl: './materials-page.component.html',
  styleUrls: ['./materials-page.component.css']
})
export class MaterialsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('collapsible', { static: false }) collapsibleRef: ElementRef
  @ViewChild('modal', { static: false }) modalRef: ElementRef
  collapsible: MaterialInstance
  modal: MaterialInstance
  form: FormGroup
  loading = true
  materialId = null
  materialList: MaterialList[] = []
  materials: Material[] = []
  arrClassSteel: any[]
  arrGroupSteel: any[]

  constructor(private materialsService: MaterialsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      vid: new FormControl(null, Validators.required),
      classSteel: new FormControl(null, Validators.required),
      ni: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      cr: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      mo: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      cu: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      mn: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      w: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      v: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      co: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      si: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      ti: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      al: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      nb: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      fe: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      p: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      s: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      c: new FormControl(null, [Validators.min(0), Validators.max(100)])
    })

    this.loading = false
    this.materialsService.fetch().subscribe(materialList => {
      this.loading = true
      this.materialList = materialList
    })

  }

  ngAfterViewInit() {
    this.collapsible = MaterialService.initCollapsible(this.collapsibleRef)
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.collapsible.destroy()
  }

  onSelectMaterial(material: Material) {
    this.modal.open()
  }

  onAddMaterial() {
    this.modal.open()
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() { }

}

import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { MaterialsService } from '../shared/services/materials.service';
import { Material, MaterialList, FilterMaterial } from '../shared/interfaces';
import { MaterialInstance, MaterialService, MaterialAutocomplete } from '../shared/classes/material.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-materials-page',
  templateUrl: './materials-page.component.html',
  styleUrls: ['./materials-page.component.css']
})
export class MaterialsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal', { static: false }) modalRef: ElementRef
  @ViewChild('autocompleteCl', { static: false }) autocompleteClRef: ElementRef
  @ViewChild('autocompleteGr', { static: false }) autocompleteGrRef: ElementRef

  modal: MaterialInstance
  autocompleteCl: MaterialAutocomplete
  autocompleteGr: MaterialAutocomplete

  //высота таблицы
  loading = false
  isFilterVisible = false
  koef = 0.7
  oSub: Subscription
  height: number

  form: FormGroup = this._formBuilder.group({
    vid: [null, Validators.required],
    classSteel: ['', Validators.required],
    groupSteel: '',
    markSteel: '',
    ni: [null, [Validators.min(0), Validators.max(100)]],
    cr: [null, [Validators.min(0), Validators.max(100)]],
    mo: [null, [Validators.min(0), Validators.max(100)]],
    cu: [null, [Validators.min(0), Validators.max(100)]],
    mn: [null, [Validators.min(0), Validators.max(100)]],
    w: [null, [Validators.min(0), Validators.max(100)]],
    v: [null, [Validators.min(0), Validators.max(100)]],
    co: [null, [Validators.min(0), Validators.max(100)]],
    si: null,
    ti: [null, [Validators.min(0), Validators.max(100)]],
    al: null,
    nb: null,
    fe: [null, [Validators.min(0), Validators.max(100)]],
    p: [null, [Validators.min(0), Validators.max(100)]],
    s: [null, [Validators.min(0), Validators.max(100)]],
    c: [null, [Validators.min(0), Validators.max(100)]]
  })

  materialId = null
  materialList: MaterialList[] = []

  materials: Material[] = []
  filter: FilterMaterial = {}

  arrClassSteel: string[]
  arrGroupSteel: string[]
  data: {}

  constructor(private materialsService: MaterialsService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loading = true
    this.height = this.koef * window.innerHeight
    this.fetch()
    this.arrClassSteel = this.arrClassSteel
    this.arrGroupSteel = this.arrGroupSteel
  }

  private fetch() {
    const params = Object.assign({}, this.filter)
    this.oSub = this.materialsService.fetch(params).subscribe(materialList => {
      this.materials = materialList['materials']
      this.arrClassSteel = materialList['arrClassSteel']
      this.arrGroupSteel = materialList['arrGroupSteel']
      this.loading = false
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = this.koef * event.target.innerHeight
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    this.autocompleteCl = MaterialService.initAutocomplete(this.autocompleteClRef, this.validate.bind(this), 0)
    this.autocompleteGr = MaterialService.initAutocomplete(this.autocompleteGrRef, this.validate.bind(this), 0)
  }

  ngOnDestroy() {
    this.modal.destroy()
    this.oSub.unsubscribe()
    this.autocompleteCl.destroy()
    this.autocompleteGr.destroy()
  }

  onCancel() {
    this.modal.close()
  }

  filterVisible() {
    this.isFilterVisible = !this.isFilterVisible
    if (this.isFilterVisible === true) {
      this.koef = 0.5
    } else {
      this.koef = 0.7
    }
    this.height = this.koef * window.innerHeight
  }

  applyFilter(filter: FilterMaterial) {
    this.materials = []
    this.filter = filter
    this.loading = true
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

  //change autocomplete data []
  update() {
    this.autocompleteCl.updateData(this.arrToString(this.arrClassSteel))
    this.autocompleteGr.updateData(this.arrToString(this.arrGroupSteel))
  }

  // [] => {}
  private arrToString(arr: string[]) {
    this.data = {}
    for (let val of arr) {
      this.data[val] = null
    }
    return this.data
  }

  //change form value after autocomplete
  validate() {
    if (this.autocompleteCl.el.value) {
      this.form.patchValue({ classSteel: this.autocompleteCl.el.value })
    }
    if (this.autocompleteGr.el.value) {
      this.form.patchValue({ groupSteel: this.autocompleteGr.el.value })
    }
  }

  onAddMaterial() {
    this.materialId = null
    this.form.reset({
      classSteel: '',
      groupSteel: '',
      markSteel: '',
      vid: null,
      ni: null,
      cr: null,
      mo: null,
      cu: null,
      mn: null,
      w: null,
      v: null,
      co: null,
      si: null,
      ti: null,
      al: null,
      nb: null,
      fe: null,
      p: null,
      s: null,
      c: null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
    this.update()
  }

  onSelectMaterial(material: Material) {
    this.materialId = material._id
    this.form.patchValue({
      classSteel: material.classSteel,
      groupSteel: material.groupSteel,
      markSteel: material.markSteel,
      vid: material.vid,
      ni: material.ni === 0 ? '' : material.ni,
      cr: material.cr === 0 ? '' : material.cr,
      mo: material.mo === 0 ? '' : material.mo,
      cu: material.cu === 0 ? '' : material.cu,
      mn: material.mn === 0 ? '' : material.mn,
      w: material.w === 0 ? '' : material.w,
      v: material.v === 0 ? '' : material.v,
      co: material.co === 0 ? '' : material.co,
      si: material.si,
      ti: material.ti === 0 ? '' : material.ti,
      al: material.al,
      nb: material.nb,
      fe: material.fe === 0 ? '' : material.fe,
      p: material.p === 0 ? '' : material.p,
      s: material.s === 0 ? '' : material.s,
      c: material.c === 0 ? '' : material.c
    })
    this.modal.open()
    MaterialService.updateTextInputs()
    this.update()
  }

  onDeleteMaterial(event: Event, material: Material) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить материал "${material.vid}"?`)

    if (decision) {
      this.materialsService.delete(material).subscribe(
        response => {
          const idx = this.materials.findIndex(m => m._id === material._id)
          this.materials.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onSubmit() {
    this.form.setValue
    this.form.disable()

    const newMaterial: Material = {
      classSteel: !this.autocompleteCl.el.value ? this.form.value.classSteel : this.autocompleteCl.el.value,
      groupSteel: !this.autocompleteGr.el.value ? this.form.value.groupSteel : this.autocompleteGr.el.value,
      markSteel: this.form.value.markSteel,
      vid: this.form.value.vid,
      ni: !this.form.value.ni ? +0 : +(this.form.value.ni).toFixed(2),
      cr: !this.form.value.cr ? +0 : +(this.form.value.cr).toFixed(2),
      mo: !this.form.value.mo ? +0 : +(this.form.value.mo).toFixed(2),
      cu: !this.form.value.cu ? +0 : +(this.form.value.cu).toFixed(2),
      mn: !this.form.value.mn ? +0 : +(this.form.value.mn).toFixed(2),
      w: !this.form.value.w ? +0 : +(this.form.value.w).toFixed(2),
      v: !this.form.value.v ? +0 : +(this.form.value.v).toFixed(2),
      co: !this.form.value.co ? +0 : +(this.form.value.co).toFixed(2),
      si: this.form.value.si,
      ti: !this.form.value.ti ? +0 : +(this.form.value.ti).toFixed(2),
      al: this.form.value.al,
      nb: this.form.value.nb,
      fe: !this.form.value.fe ? +0 : +(this.form.value.fe).toFixed(2),
      p: !this.form.value.p ? +0 : +(this.form.value.p).toFixed(2),
      s: !this.form.value.s ? +0 : +(this.form.value.s).toFixed(2),
      c: !this.form.value.c ? +0 : +(this.form.value.c).toFixed(2)
    }

    if (!newMaterial.groupSteel) {
      newMaterial.groupSteel = newMaterial.classSteel
    }

    const sum: number = newMaterial.ni + newMaterial.cr + newMaterial.mo + newMaterial.cu + newMaterial.mn + newMaterial.w + newMaterial.v + newMaterial.co + newMaterial.ti + newMaterial.p + newMaterial.s + newMaterial.c + newMaterial.fe
    if (sum > 100) {
      this.modal.close()
      this.form.enable()
      return MaterialService.toast('Содержание элементов не может быть больше 100%')
    }

    const completed = () => {
      this.modal.close()
      this.form.enable()
    }

    if (this.materialId) {
      newMaterial._id = this.materialId
      this.materialsService.update(newMaterial).subscribe(
        material => {
          const idx = this.materials.findIndex(p => p._id === material._id)
          this.materials[idx] = material
          MaterialService.toast('Изменения сохранены')
        },
        error => MaterialService.toast(error.error.message),

      )
      this.modal.close()
      this.form.enable()

    } else {
      let mdx = this.materials.findIndex(p => p.vid === newMaterial.vid)
      if (mdx < 0) {
        this.materialsService.create(newMaterial).subscribe(
          material => {
            MaterialService.toast('Материал создан')
            this.materials.push(material)
            this.materials.sort((a, b) => Intl.Collator().compare(a.vid, b.vid))
          },
          error => MaterialService.toast(error.error.message),
          completed
        )
      } else {
        MaterialService.toast(`Материал "${newMaterial.vid}" уже существует`)
        this.modal.close()
        this.form.enable()
      }

    }
  }

}

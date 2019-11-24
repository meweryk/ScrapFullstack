import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { MaterialsService } from '../shared/services/materials.service';
import { Material, MaterialList, FilterMaterial } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-materials-page',
  templateUrl: './materials-page.component.html',
  styleUrls: ['./materials-page.component.css']
})
export class MaterialsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal', { static: false }) modalRef: ElementRef
  @ViewChild('tooltip', { static: false }) tooltipRef: ElementRef
  @ViewChild('tooltipAdd', { static: false }) tooltipAddRef: ElementRef
  loading = false
  isFilterVisible = false
  height: number
  modal: MaterialInstance
  tooltipAdd: MaterialInstance
  tooltip: MaterialInstance
  form: FormGroup
  materialId = null
  materialList: MaterialList[] = []
  materials: Material[] = []
  arrClassSteel: any[]
  arrGroupSteel: any[]

  constructor(private materialsService: MaterialsService) { }

  ngOnInit() {
    this.loading = true
    this.height = 0.70 * window.innerHeight;

    this.form = new FormGroup({
      vid: new FormControl(null, Validators.required),
      classSteel: new FormControl(null, Validators.required),
      groupSteel: new FormControl(null),
      markSteel: new FormControl(null),
      ni: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      cr: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      mo: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      cu: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      mn: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      w: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      v: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      co: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      si: new FormControl(null),
      ti: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      al: new FormControl(null),
      nb: new FormControl(null),
      fe: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      p: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      s: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      c: new FormControl(null, [Validators.min(0), Validators.max(100)])
    })

    this.materialsService.fetch().subscribe(materials => {
      this.loading = false
      this.materials = materials
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.70 * event.target.innerHeight;
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    this.tooltipAdd = MaterialService.initTooltip(this.tooltipAddRef)
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy() {
    this.tooltipAdd.destroy()
    this.tooltip.destroy()
    this.modal.destroy()
  }

  applyFilter(filter: FilterMaterial) { }

  onSelectMaterial(material: Material) {
    this.materialId = material._id
    this.form.patchValue({
      classSteel: material.classSteel,
      groupSteel: material.groupSteel,
      markSteel: material.markSteel,
      vid: material.vid,
      ni: material.ni,
      cr: material.cr,
      mo: material.mo,
      cu: material.cu,
      mn: material.mn,
      w: material.w,
      v: material.v,
      co: material.co,
      si: material.si,
      ti: material.ti,
      al: material.al,
      nb: material.nb,
      fe: material.fe,
      p: material.p,
      s: material.s,
      c: material.c
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddMaterial() {
    this.materialId = null
    this.form.reset({
      classSteel: null,
      groupSteel: null,
      markSteel: '',
      vid: null,
      ni: 0,
      cr: 0,
      mo: 0,
      cu: 0,
      mn: 0,
      w: 0,
      v: 0,
      co: 0,
      si: 0,
      ti: 0,
      al: 0,
      nb: 0,
      fe: 0,
      p: 0,
      s: 0,
      c: 0
    })
    this.modal.open()
    MaterialService.updateTextInputs()
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

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()

    const newMaterial: Material = {
      classSteel: this.form.value.classSteel,
      groupSteel: this.form.value.groupSteel,
      markSteel: this.form.value.markSteel,
      vid: this.form.value.vid,
      ni: this.form.value.ni,
      cr: this.form.value.cr,
      mo: this.form.value.mo,
      cu: this.form.value.cu,
      mn: this.form.value.mn,
      w: this.form.value.w,
      v: this.form.value.v,
      co: this.form.value.co,
      si: this.form.value.si,
      ti: this.form.value.ti,
      al: this.form.value.al,
      nb: this.form.value.nb,
      fe: this.form.value.fe,
      p: this.form.value.p,
      s: this.form.value.s,
      c: this.form.value.c
    }

    const completed = () => {
      this.modal.close()
      this.form.enable()
    }

    if (!newMaterial.groupSteel) {
      newMaterial.groupSteel = newMaterial.classSteel
    }

    const sum = newMaterial.ni + newMaterial.cr + newMaterial.mo + newMaterial.cu + newMaterial.mn + newMaterial.w + newMaterial.v + newMaterial.co + newMaterial.ti + newMaterial.p + newMaterial.s + newMaterial.c + newMaterial.fe
    if (sum > 100) {
      this.modal.close()
      this.form.enable()
      return MaterialService.toast('Содержание элементов не может быть больше 100%')
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
        completed
      )
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

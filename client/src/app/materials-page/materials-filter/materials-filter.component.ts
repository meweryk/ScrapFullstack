import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { FilterMaterial } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-materials-filter',
  templateUrl: './materials-filter.component.html',
  styleUrls: ['./materials-filter.component.css']
})
export class MaterialsFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() arrClassSteel: any[]
  @Input() arrGroupSteel: any[]
  @Output() onFilter = new EventEmitter<FilterMaterial>()

  @ViewChild('select1') select1Ref: ElementRef
  @ViewChild('select2') select2Ref: ElementRef

  select1: MaterialInstance
  select2: MaterialInstance

  vid: string
  classSteel: string
  groupSteel: string

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.select1 = MaterialService.initFormSelect(this.select1Ref)
    this.select2 = MaterialService.initFormSelect(this.select2Ref)
  }

  ngOnDestroy() {
    this.select1.destroy()
    this.select2.destroy()
  }

  submitFilter() {
    const filter: FilterMaterial = {}

    if (this.vid) {
      filter.vid = this.vid
    }

    if (this.classSteel) {
      filter.classSteel = this.classSteel
    }

    if (this.groupSteel) {
      filter.groupSteel = this.groupSteel
    }

    this.onFilter.emit(filter)
  }

}

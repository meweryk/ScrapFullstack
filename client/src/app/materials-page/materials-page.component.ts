import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MaterialsService } from '../shared/services/materials.service';
import { Material, MaterialList } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-materials-page',
  templateUrl: './materials-page.component.html',
  styleUrls: ['./materials-page.component.css']
})
export class MaterialsPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('collapsible', { static: false }) collapsibleRef: ElementRef
  collapsible: MaterialInstance
  loading = true
  materialList: MaterialList[] = []
  materials: Material[] = []
  arrClassSteel: any[]
  arrGroupSteel: any[]

  constructor(private materialsService: MaterialsService) { }

  ngOnInit() {
    this.loading = false
    this.materialsService.fetch().subscribe(materialList => {
      this.loading = true
      this.materialList = materialList
    })

  }

  ngAfterViewInit() {
    this.collapsible = MaterialService.initCollapsible(this.collapsibleRef)
  }

  ngOnDestroy() {
    this.collapsible.destroy()
  }

}

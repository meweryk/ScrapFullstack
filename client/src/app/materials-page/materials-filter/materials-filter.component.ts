import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterMaterial } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-materials-filter',
  templateUrl: './materials-filter.component.html',
  styleUrls: ['./materials-filter.component.css']
})
export class MaterialsFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter<FilterMaterial>()
  vid: string
  classSteel: string
  classGroup: string

  constructor() { }

  ngOnInit() {
  }

  submitFilter() {
    const filter: FilterMaterial = {}

    if (this.vid) {
      filter.vid = this.vid
    }

    this.onFilter.emit(filter)
  }

}

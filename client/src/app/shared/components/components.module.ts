import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { SearchPipe } from './pipes/search.pipe';
import { SearchShopPipe } from './pipes/searchshop.pipe';
import { HistoryListPipe } from './pipes/history-list.pipe';
import { FuseFilterPipe } from './pipes/fuse-filter.pipe'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchPipe,
    HistoryListPipe,
    SearchShopPipe,
    FuseFilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoaderComponent,
    SearchPipe,
    HistoryListPipe,
    SearchShopPipe,
    FuseFilterPipe
  ]
})
export class ComponentModule { }

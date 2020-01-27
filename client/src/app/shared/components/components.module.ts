import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { SearchPipe } from './pipes/search.pipe';
import { HistoryListPipe } from './pipes/history-list.pipe';
import { ModalDeliveryComponent } from './modal-delivery/modal-delivery.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoaderComponent,
        SearchPipe,
        HistoryListPipe,
        ModalDeliveryComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoaderComponent,
        SearchPipe,
        HistoryListPipe,
        ModalDeliveryComponent,
    ]
})
export class ComponentModule { }
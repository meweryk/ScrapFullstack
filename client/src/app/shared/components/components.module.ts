import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { SearchPipe } from './pipes/search.pipe';
import { HistoryListPipe } from './pipes/history-list.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LoaderComponent,
        SearchPipe,
        HistoryListPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        LoaderComponent,
        SearchPipe,
        HistoryListPipe
    ]
})
export class ComponentModule { }
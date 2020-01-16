import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { SearchPipe } from './pipes/search.pipe';
import { HistoryListPipe } from './pipes/history-list.pipe';

@NgModule({
    declarations: [
        LoaderComponent,
        SearchPipe,
        HistoryListPipe,
    ],
    exports: [
        LoaderComponent,
        SearchPipe,
        HistoryListPipe
    ]
})
export class ComponentModule { }
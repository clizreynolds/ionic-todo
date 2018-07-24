import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ListService } from './services/list.service';

const services: any[] = [
    ListService
];
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [],
    providers: [].concat(services)
})

export class SharedModule { }

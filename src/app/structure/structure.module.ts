import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { StructureComponent } from './structure/structure.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        NgJsonEditorModule,
    ],
    declarations: [
        StructureComponent
    ]
})
export class StructureModule { }

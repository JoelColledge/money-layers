import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { JSONEditorModule } from 'ngx-jsoneditor';

import { StructureComponent } from './structure/structure.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JSONEditorModule,
    ],
    declarations: [
        StructureComponent
    ]
})
export class StructureModule { }

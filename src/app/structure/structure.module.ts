import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { NgJsonEditorModule } from 'ang-jsoneditor';

import { StructureComponent } from './structure/structure.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgJsonEditorModule,
    ],
    declarations: [
        StructureComponent
    ]
})
export class StructureModule { }

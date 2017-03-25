import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

import { AccountComponent } from './account/account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { RuleComponent } from './rule/rule.component';
import { RuleListComponent } from './rule-list/rule-list.component';
import { StructureComponent } from './structure/structure.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
    ],
    declarations: [
        AccountComponent,
        AccountListComponent,
        RuleComponent,
        RuleListComponent,
        StructureComponent
    ]
})
export class StructureModule { }

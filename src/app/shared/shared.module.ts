import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AccountService }   from './account.service';
import { RuleService }   from './rule.service';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [],
    providers: [
        AccountService,
        RuleService,
    ],
})
export class SharedModule { }

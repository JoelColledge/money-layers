import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AccountService }   from './account.service';
import { RuleService }   from './rule.service';
import { StructureCacheService } from './structure-cache.service';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [],
    providers: [
        AccountService,
        RuleService,
        StructureCacheService,
    ],
})
export class SharedModule { }

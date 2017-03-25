import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AccountTotalsComponent } from './account-totals/account-totals.component';
import { StatisticsService } from './statistics.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        AccountTotalsComponent,
    ],
    exports: [
        AccountTotalsComponent,
    ],
    providers: [
        StatisticsService,
    ],
})
export class StatisticsModule { }

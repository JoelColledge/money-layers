import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AccountTotalsComponent } from './account-totals/account-totals.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { StatisticsService } from './statistics.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
    ],
    declarations: [
        AccountTotalsComponent,
        CashFlowComponent,
    ],
    exports: [
        AccountTotalsComponent,
        CashFlowComponent,
    ],
    providers: [
        StatisticsService,
    ],
})
export class StatisticsModule { }

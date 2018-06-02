import { Component, OnInit } from '@angular/core';

import {
    StatisticsService
} from '../statistics.service';

import {monthToDate} from '../../../../common-types/transaction';
import {MonthChange} from '../../../../common-types/statistics';

@Component({
  selector: 'cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {
    changeByMonth: MonthChange[] = [];

    constructor(
        private _statisticsService: StatisticsService
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._statisticsService
            .changeByMonth()
            .subscribe((changeByMonth) => {
                this.changeByMonth = changeByMonth;
            });
    }

    monthToDate = monthToDate;

    scale(amount: number): number {
        let max = Math.max(...this.changeByMonth.map(monthChange => Math.max(monthChange.increase, monthChange.decrease)));
        return amount / max;
    }
}

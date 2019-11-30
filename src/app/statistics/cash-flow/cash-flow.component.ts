import { Component, OnInit } from '@angular/core';

import {
    StatisticsService
} from '../statistics.service';

import {monthToDate} from '../../../../common-types/transaction';
import {MonthChange} from '../../../../common-types/statistics';
import {Structure} from '../../../../common-types/structure';

@Component({
  selector: 'cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

    constructor(
        private statisticsService: StatisticsService
    ) { }
    changeByMonth: MonthChange[] = [];

    private comparison = 1;

    monthToDate = monthToDate;

    ngOnInit() {
        this.getAll();
    }

    private getAll(): void {
        this.statisticsService
            .changeByMonth()
            .subscribe((changeByMonth) => {
                this.changeByMonth = changeByMonth;
                this.comparison = this.calculateComparison();
            });
    }

    private calculateComparison(): number {
        const sorted = this.changeByMonth
            .reduce((acc, monthChange) => acc.concat([monthChange.increase, monthChange.decrease]), [])
            .sort((a, b) => b - a);

        let comparison: number;
        if (sorted.length > 6) {
            // eliminate anomalies
            for (let i = 0; i < 6; i++) {
                if (sorted[i] < sorted[6] * 2.5) {
                    comparison = sorted[i];
                    break;
                }
            }
        } else if (sorted.length > 0) {
            comparison = sorted[0];
        } else {
            comparison = 1;
        }

        return comparison;
    }

    overflows(amount: number): boolean {
        return amount > this.comparison;
    }

    scale(amount: number): number {
        return Math.min(amount / this.comparison, 1);
    }
}

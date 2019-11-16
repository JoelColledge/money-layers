import {
    Inject,
    Injectable
} from '@angular/core';

import {
    Observable,
    Subject,
    concat,
    of
} from 'rxjs';

import {
    HttpClient
} from '@angular/common/http';

import {
    map,
    concatMap,
    shareReplay
} from 'rxjs/operators';

import {AccountTotal, MonthChange} from '../../../common-types/statistics';

@Injectable()
export class StatisticsService {
    private _update: Subject<null> = new Subject();
    private _accountTotals: Observable<AccountTotal[]> = new Observable();
    private _changeByMonth: Observable<MonthChange[]> = new Observable();

    constructor(private _http: HttpClient) {
        this._accountTotals = concat(of(null), this._update)
            .pipe(concatMap(_ => this._http
                .get<AccountTotal[]>('/api/accountTotals')
            ))
            .pipe(shareReplay(1));
        this._changeByMonth = concat(of(null), this._update)
            .pipe(concatMap(_ => this._http
                .get<MonthChange[]>('/api/changeByMonth')
            ))
            .pipe(shareReplay(1));
    }

    update(): void {
        this._update.next(null);
    }

    accountTotals(): Observable<AccountTotal[]> {
        return this._accountTotals;
    }

    changeByMonth(): Observable<MonthChange[]> {
        return this._changeByMonth;
    }
}

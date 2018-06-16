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
    Http,
    Headers
} from '@angular/http';

import {
    map,
    concatMap,
    share
} from 'rxjs/operators';

import {AccountTotal, MonthChange} from '../../../common-types/statistics';

@Injectable()
export class StatisticsService {
    private _update: Subject<null> = new Subject();
    private _accountTotals: Observable<AccountTotal[]> = new Observable();
    private _changeByMonth: Observable<MonthChange[]> = new Observable();

    constructor(@Inject(Http) private _http: Http) {
        this._accountTotals = concat(of(null), this._update)
            .pipe(concatMap(_ => this._http
                .get('/api/accountTotals')
                .pipe(map(r => r.json()))
            ))
            .pipe(share());
        this._changeByMonth = concat(of(null), this._update)
            .pipe(concatMap(_ => this._http
                .get('/api/changeByMonth')
                .pipe(map(r => r.json()))
            ))
            .pipe(share());
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

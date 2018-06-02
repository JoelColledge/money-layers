import {
    Inject,
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs';

import {
    Http,
    Headers
} from '@angular/http';

import {
    map
} from 'rxjs/operators';

import {AccountTotal} from '../../../common-types/statistics';

@Injectable()
export class StatisticsService {
    constructor(@Inject(Http) private _http: Http) {
    }

    accountTotals(): Observable<AccountTotal[]> {
        return this._http
            .get('/api/accountTotals')
            .pipe(map((r) => r.json()));
    }
}

import {
    Inject,
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs/Observable';

import {
    Http,
    Headers
} from '@angular/http';

import 'rxjs/add/operator/map';

import {AccountTotal} from '../../common-types/statistics';

@Injectable()
export class StatisticsService {
    constructor(@Inject(Http) private _http: Http) {
    }

    accountTotals(): Observable<AccountTotal[]> {
        return this._http
            .get('/api/accountTotals')
            .map((r) => r.json());
    }
}

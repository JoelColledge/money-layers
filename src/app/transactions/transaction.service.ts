import {
    Inject,
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs';

import {
    tap
} from 'rxjs/operators';

import {
    Http,
    Headers,
    URLSearchParams
} from '@angular/http';

import {
    map
} from 'rxjs/operators';

import {
    StatisticsService
} from '../statistics/statistics.service';

import {Transaction} from '../../../common-types/transaction';

@Injectable()
export class TransactionService {
    static ENDPOINT: string = '/api/transactions/:id';

    constructor(
        @Inject(Http) private _http: Http,
        private _statisticsService: StatisticsService) {
    }

    getAll(month: number): Observable<Transaction[]> {
        let params: URLSearchParams = new URLSearchParams();

        if (month) {
            params.set('month', month.toString());
        }

        return this._http
            .get(TransactionService.ENDPOINT.replace('/:id', ''), {
                search: params
            }).pipe(map((r) => r.json()));
    }

    get(id: string): Observable<Transaction> {
        return this._http
            .get(TransactionService.ENDPOINT.replace(':id', id))
            .pipe(map((r) => r.json()));
    }

    add(transaction: Transaction): Observable<Transaction> {
        let _messageStringified = JSON.stringify(transaction);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(TransactionService.ENDPOINT.replace('/:id', ''), _messageStringified, {headers})
            .pipe(tap(_ => this._statisticsService.update()))
            .pipe(map((r) => r.json()));
    }

    update(transaction: Transaction): Observable<Transaction> {
        let _messageStringified = JSON.stringify(transaction);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(TransactionService.ENDPOINT.replace(':id', transaction._id), _messageStringified, {headers})
            .pipe(tap(_ => this._statisticsService.update()))
            .pipe(map((r) => r.json()));
    }

    addOrUpdate(transaction: Transaction): Observable<Transaction> {
        if (transaction._id) {
            return this.update(transaction);
        } else {
            return this.add(transaction);
        }
    }

    delete(id: string): Observable<{}> {
        return this._http
            .delete(TransactionService.ENDPOINT.replace(':id', id))
            .pipe(tap(_ => this._statisticsService.update()));
    }
}

import {
    Inject,
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs';

import {
    tap,
    map
} from 'rxjs/operators';

import {
    HttpClient,
    HttpHeaders,
    HttpParams
} from '@angular/common/http';

import {
    StatisticsService
} from '../statistics/statistics.service';

import {Transaction} from '../../../common-types/transaction';

@Injectable()
export class TransactionService {
    static ENDPOINT = '/api/transactions/:id';

    constructor(
        private _http: HttpClient,
        private _statisticsService: StatisticsService) {
    }

    getAll(month: number): Observable<Transaction[]> {
        const options = month ?
            { params: new HttpParams().set('month', month.toString()) } : {};

        return this._http
            .get<Transaction[]>(TransactionService.ENDPOINT.replace('/:id', ''), options);
    }

    get(id: string): Observable<Transaction> {
        return this._http
            .get<Transaction>(TransactionService.ENDPOINT.replace(':id', id));
    }

    add(transaction: Transaction): Observable<Transaction> {
        const _messageStringified = JSON.stringify(transaction);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
	});

        return this._http
            .post<Transaction>(TransactionService.ENDPOINT.replace('/:id', ''), _messageStringified, {headers})
            .pipe(tap(_ => this._statisticsService.update()));
    }

    update(transaction: Transaction): Observable<Transaction> {
        const _messageStringified = JSON.stringify(transaction);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
	});

        return this._http
            .post<Transaction>(TransactionService.ENDPOINT.replace(':id', transaction._id), _messageStringified, {headers})
            .pipe(tap(_ => this._statisticsService.update()));
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

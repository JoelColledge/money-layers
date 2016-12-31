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

import {ITransaction} from '../../common-types/transaction';

@Injectable()
export class TransactionService {
    static ENDPOINT: string = '/api/transactions/:id';

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll(): Observable<ITransaction[]> {
        return this._http
            .get(TransactionService.ENDPOINT.replace(':id', ''))
            .map((r) => r.json());
    }

    get(id: string): Observable<ITransaction> {
        return this._http
            .get(TransactionService.ENDPOINT.replace(':id', id))
            .map((r) => r.json());
    }

    add(transaction: ITransaction): Observable<ITransaction> {
        let _messageStringified = JSON.stringify(transaction);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(TransactionService.ENDPOINT.replace(':id', ''), _messageStringified, {headers})
            .map((r) => r.json());
    }

    update(transaction: ITransaction): Observable<ITransaction> {
        let _messageStringified = JSON.stringify(transaction);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(TransactionService.ENDPOINT.replace(':id', transaction._id), _messageStringified, {headers})
            .map((r) => r.json());
    }

    addOrUpdate(transaction: ITransaction): Observable<ITransaction> {
        if (transaction._id) {
            return this.update(transaction);
        } else {
            return this.add(transaction);
        }
    }

    delete(id: string): Observable<{}> {
        return this._http
            .delete(TransactionService.ENDPOINT.replace(':id', id));
    }
}

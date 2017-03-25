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

import {Account} from '../../../common-types/account';

@Injectable()
export class AccountService {
    static ENDPOINT: string = '/api/accounts/:id';

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll(): Observable<Account[]> {
        return this._http
            .get(AccountService.ENDPOINT.replace(':id', ''))
            .map((r) => r.json());
    }

    get(id: string): Observable<Account> {
        return this._http
            .get(AccountService.ENDPOINT.replace(':id', id))
            .map((r) => r.json());
    }

    add(account: Account): Observable<Account> {
        let _messageStringified = JSON.stringify(account);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(AccountService.ENDPOINT.replace(':id', ''), _messageStringified, {headers})
            .map((r) => r.json());
    }

    update(account: Account): Observable<Account> {
        let _messageStringified = JSON.stringify(account);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(AccountService.ENDPOINT.replace(':id', account._id), _messageStringified, {headers})
            .map((r) => r.json());
    }

    addOrUpdate(account: Account): Observable<Account> {
        if (account._id) {
            return this.update(account);
        } else {
            return this.add(account);
        }
    }

    remove(id: string): Observable<{}> {
        return this._http
            .delete(AccountService.ENDPOINT.replace(':id', id));
    }
}

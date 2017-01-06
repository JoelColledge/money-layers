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

import {Rule} from '../../common-types/account';

@Injectable()
export class RuleService {
    static ENDPOINT: string = '/api/rules/:id';

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll(): Observable<Rule[]> {
        return this._http
            .get(RuleService.ENDPOINT.replace(':id', ''))
            .map((r) => r.json());
    }

    get(id: string): Observable<Rule> {
        return this._http
            .get(RuleService.ENDPOINT.replace(':id', id))
            .map((r) => r.json());
    }

    add(rule: Rule): Observable<Rule> {
        let _messageStringified = JSON.stringify(rule);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(RuleService.ENDPOINT.replace(':id', ''), _messageStringified, {headers})
            .map((r) => r.json());
    }

    update(rule: Rule): Observable<Rule> {
        let _messageStringified = JSON.stringify(rule);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .post(RuleService.ENDPOINT.replace(':id', rule._id), _messageStringified, {headers})
            .map((r) => r.json());
    }

    addOrUpdate(rule: Rule): Observable<Rule> {
        if (rule._id) {
            return this.update(rule);
        } else {
            return this.add(rule);
        }
    }

    remove(id: string): Observable<{}> {
        return this._http
            .delete(RuleService.ENDPOINT.replace(':id', id));
    }
}

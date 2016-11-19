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

import {ITodo} from '../../../common-types/todo';

@Injectable()
export class TodoService {
    static ENDPOINT: string = '/api/todos/:id';

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll(): Observable<ITodo[]> {
        return this._http
                   .get(TodoService.ENDPOINT.replace(':id', ''))
                   .map((r) => r.json());
    }

    add(todo: ITodo): Observable<ITodo> {
        let _messageStringified = JSON.stringify(todo);

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');

        return this._http
                   .post(TodoService.ENDPOINT.replace(':id', ''), _messageStringified, {headers})
                   .map((r) => r.json());
    }

    remove(id: string): Observable<{}> {
        return this._http
                   .delete(TodoService.ENDPOINT.replace(':id', id));
    }
}

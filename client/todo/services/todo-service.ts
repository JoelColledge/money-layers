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

import Todo from '../../../common-types/todo';

@Injectable()
export class TodoService {
    static ENDPOINT: string = '/api/todos/:id';

    constructor(@Inject(Http) private _http: Http) {
    }

    getAll(): Observable<Todo[]> {
        return this._http
                   .get(TodoService.ENDPOINT.replace(':id', ''))
                   .map((r) => r.json());
    }

    add(message: string): Observable<Todo> {
        let _messageStringified = JSON.stringify({todoMessage: message});

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

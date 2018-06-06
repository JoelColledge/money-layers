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

import {Structure} from '../../../common-types/structure';

@Injectable()
export class StructureService {
    static ENDPOINT: string = '/api/structure';

    constructor(@Inject(Http) private _http: Http) {
    }

    get(): Observable<Structure> {
        return this._http
            .get(StructureService.ENDPOINT)
            .pipe(map((r) => r.json()));
    }

    update(structure: Structure): Observable<Structure> {
        let _messageStringified = JSON.stringify(structure);

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http
            .put(StructureService.ENDPOINT, _messageStringified, {headers})
            .pipe(map((r) => r.json()));
    }

}

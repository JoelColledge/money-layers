import {
    Inject,
    Injectable
} from '@angular/core';

import {
    Observable
} from 'rxjs';

import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';

import {
    map
} from 'rxjs/operators';

import {Structure} from '../../../common-types/structure';

@Injectable()
export class StructureService {
    static ENDPOINT = '/api/structure';

    constructor(private _http: HttpClient) {
    }

    get(): Observable<Structure> {
        return this._http
            .get<Structure>(StructureService.ENDPOINT);
    }

    update(structure: Structure): Observable<Structure> {
        const _messageStringified = JSON.stringify(structure);

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
	});

        return this._http
            .put<Structure>(StructureService.ENDPOINT, _messageStringified, {headers});
    }

}

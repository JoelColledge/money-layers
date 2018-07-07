import { Injectable } from '@angular/core';

import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import {
    Observable
} from 'rxjs';

import {
    tap
} from 'rxjs/operators';

import {
    StructureService
} from './structure.service';

import {Structure} from '../../../common-types/structure';

@Injectable()
export class StructureCacheService implements Resolve<Structure>  {
    private structure: Structure;

    constructor(
        private structureService: StructureService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Structure> {
        return this.structureService.get().pipe(tap(structure => this.structure = structure));
    }
}

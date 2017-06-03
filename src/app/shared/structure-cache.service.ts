import { Injectable } from '@angular/core';

import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import {
    Observable
} from 'rxjs/Rx';

import {
    AccountService
} from './account.service';

import {
    RuleService
} from './rule.service';

import {Structure} from '../../../common-types/account';

@Injectable()
export class StructureCacheService implements Resolve<Structure>  {
    private structure: Structure;

    constructor(
        private accountService: AccountService,
        private ruleService: RuleService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Structure> {
        return this.fetch();
    }

    fetch(): Observable<Structure> {
        let accountsObservable = this.accountService.getAll();
        let rulesObservable = this.ruleService.getAll();
        let shared = Observable.forkJoin(accountsObservable, rulesObservable)
            .map(([accounts, rules]) =>  new Structure(accounts, rules))
            .share();
        shared.subscribe(structure => {
                this.structure = structure;
            });
        return shared;
    }

    get(): Structure {
        return this.structure;
    }
}

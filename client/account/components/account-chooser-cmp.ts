import {
    Component,
    Inject,
    OnInit
} from '@angular/core';

import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import {
    AccountService
} from '../services/account-service';

import {IAccount, Account} from '../../../common-types/account';

@Component({
    selector: 'account-chooser',
    templateUrl: 'account/templates/account-chooser.html',
    styles: []
})
export class AccountChooserCmp {

    accountNames: string[] = [];
    selected: string = '';

    constructor(
        private _accountService: AccountService
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._accountService
            .getAll()
            .subscribe((accounts) => {
                this.accountNames = accounts.map((account) => account.name);
            });
    }

    public typeaheadOnSelect(e:TypeaheadMatch):void {
        console.log('Selected value: ', e.value);
    }

}

import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

import {
    AccountService
} from '../services/account-service';

import {IAccount, Account} from '../../common-types/account';

@Component({
    selector: 'account-chooser',
    templateUrl: 'transactions/account-chooser.html',
    styles: []
})
export class AccountChooserCmp {
    @Input()
    set account(account: IAccount) {
        this.accountName = account.name;
    }

    @Output() onAccountChanged: EventEmitter<IAccount> = new EventEmitter<IAccount>();

    accounts: IAccount[] = [];
    accountName: string = '';
    accountNames: string[] = [];

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
                this.accounts = accounts;
                this.accountNames = accounts.map((account) => account.name);
            });
    }

    public typeaheadOnSelect(e:TypeaheadMatch):void {
        let account: IAccount = this.accounts.find((account) => account.name === e.value);
        if (account) {
            this.onAccountChanged.emit(account);
        }
    }

}

import {
    Component,
    Inject,
    OnInit
} from '@angular/core';

import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';

import {
    Router
} from '@angular/router';

import {
    AccountService
} from '../services/account-service';

import {Account} from '../../common-types/account';

@Component({
    selector: 'account-list',
    templateUrl: 'accounts/account-list.html',
    styleUrls: ['styles/account.css']
})
export class AccountListCmp implements OnInit {
    accounts: Account[] = [];
    accountForm: Account;
    accountFormIsActual: boolean;

    constructor(
        private _accountService: AccountService,
        private router: Router
    ) {
        this.accountForm = new Account();
    }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._accountService
            .getAll()
            .subscribe((accounts) => {
                this.accounts = accounts;
            });
    }

    add(): void {
        this.accountForm.layer = this.accountFormIsActual ? "actual" : "logical";
        this._accountService
            .add(this.accountForm)
            .subscribe((m) => {
                this.accounts.push(m);
                this.accountForm = new Account();
            });
    }
}

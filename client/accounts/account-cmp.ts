import {
    Component,
    Inject,
    Input,
    OnInit
} from '@angular/core';

import {
    Validators,
    FormBuilder,
    FormGroup,
    FormControl
} from '@angular/forms';

import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';

import {
    AccountService
} from '../services/account-service';

import {IAccount, Account} from '../../common-types/account';

@Component({
    selector: 'account',
    templateUrl: 'accounts/account.html',
    styleUrls: ['styles/account.css']
})
export class AccountCmp {
    @Input() account: Account;

    constructor(
        private _accountService: AccountService
    ) {
    }

    update(): void {
        this._accountService
            .update(this.account)
            .subscribe(account => this.account = account);
    }
}

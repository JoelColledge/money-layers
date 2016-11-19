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
    ActivatedRoute,
    Params
} from '@angular/router';

import {
    AccountService
} from '../services/account-service';

import {IAccount, Account} from '../../../common-types/account';

@Component({
    selector: 'account-cmp',
    templateUrl: 'account/templates/account.html',
    styleUrls: ['account/styles/account.css']
})
export class AccountCmp implements OnInit {
    title: string = "Accounts";
    account: Account;

    constructor(
        private route: ActivatedRoute,
        private _accountService: AccountService
    ) {
        this.account = new Account();
    }

    ngOnInit() {
        this.route.params
            .forEach((params: Params) => this._get(params['id']))
    }

    private _get(id: string): void {
        this._accountService
            .get(id)
            .subscribe((account) => {
                console.log('got', account);
                this.account = account;
            });
    }

    update(): void {
        this._accountService
            .update(this.account)
            .subscribe((account) => {
                console.log('got', account);
                this.account = account;
            });
    }
}

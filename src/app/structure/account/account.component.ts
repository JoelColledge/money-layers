import {
    Component,
    Inject,
    Input
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
} from '../../shared/account.service';

import {Account} from '../../../../common-types/account';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
    @Input() account: Account;

    get accountGroups(): string {
        return this.account.groups.join(', ');
    }

    set accountGroups(value: string) {
        this.account.groups = value.split(',').map(group => group.trim());
    }

    constructor(
        private _accountService: AccountService
    ) {
    }

    update(): void {
        this._accountService
            .addOrUpdate(this.account)
            .subscribe(account => this.account = account);
    }

}

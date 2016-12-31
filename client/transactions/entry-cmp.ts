import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

import {
    Router
} from '@angular/router';

import {
    AccountService
} from '../services/account-service';

import {IEntry, Entry} from '../../common-types/transaction';
import {IAccount, Account} from '../../common-types/account';

@Component({
    selector: 'entry',
    templateUrl: 'transactions/entry.html',
    styleUrls: ['styles/account.css']
})
export class EntryCmp implements OnInit {
    @Input()
    set entry(entry: IEntry) {
        this._entry = entry;
        this._entryChangeDecimal = entry.change / 100;

        if (entry.account) {
            this.accountService.get(entry.account)
                .subscribe((account) => this.account = account);
        }
    }

    get entry() {
        return this._entry;
    }

    @Output() onDelete = new EventEmitter<number>();

    @Input() index: number;

    set entryChangeDecimal(entryChangeDecimal: number) {
        this._entryChangeDecimal = entryChangeDecimal;
        this._entry.change = Math.round(entryChangeDecimal * 100);
    }

    get entryChangeDecimal() {
        return this._entryChangeDecimal;
    }

    _entryChangeDecimal: number = 0;
    _entry: IEntry = new Entry(undefined, 0);
    account: IAccount = new Account();

    constructor(
        private accountService: AccountService
    ) { }

    ngOnInit() {
    }

    delete(): void {
        this.onDelete.emit(this.index);
    }

    accountChanged(account: IAccount): void {
        this._entry.account = account;
    }
}

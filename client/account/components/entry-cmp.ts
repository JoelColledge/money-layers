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

import {IEntry, Entry} from '../../../common-types/transaction';
import {IAccount, Account} from '../../../common-types/account';

@Component({
    selector: 'entry',
    templateUrl: 'account/templates/entry.html',
    styleUrls: ['account/styles/account.css']
})
export class EntryCmp implements OnInit {
    @Input()
    set entry(entry: IEntry) {
        this._entry = entry;
        this.accountService.get(entry.account)
            .subscribe((account) => this.account = account);
    }

    get entry() {
        return this._entry;
    }

    @Output() onUpdate = new EventEmitter<{index: number, entry: IEntry}>();
    @Output() onDelete = new EventEmitter<number>();

    @Input() index: number;

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
}
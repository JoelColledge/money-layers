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

import {Entry} from '../../common-types/transaction';
import {Account} from '../../common-types/account';
import {EntryPattern} from '../patterns/transaction-pattern';

@Component({
    selector: 'entry',
    templateUrl: 'transactions/entry.html'
})
export class EntryCmp implements OnInit {
    @Input()
    set entry(entry: Entry) {
        this._entry = entry;

        if (entry.account) {
            this.accountService.get(entry.account)
                .subscribe((account) => this.account = account);
        }
    }

    get entry() {
        return this._entry;
    }

    @Output() onDelete = new EventEmitter<number>();

    @Output() onChange = new EventEmitter<void>();

    @Input() index: number;

    @Input() pattern: EntryPattern;

    _entry: Entry = new Entry();
    account: Account = new Account();

    constructor(
        private accountService: AccountService
    ) { }

    ngOnInit() {
    }

    amount(): number {
        return this._entry.change / 100;
    }

    amountChanged(newAmount: number) {
        this._entry.change = Math.round(newAmount * 100);
        this.onChange.emit();
    }

    delete(): void {
        this.onDelete.emit(this.index);
    }

    accountChanged(account: Account): void {
        this._entry.account = account._id;
        this.onChange.emit();
    }
}

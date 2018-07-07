import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
    Router
} from '@angular/router';

import {Entry} from '../../../../common-types/transaction';
import {Structure, Account} from '../../../../common-types/structure';
import {EntryPattern} from '../patterns/transaction-pattern';

@Component({
  selector: 'entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
    @Input() entry: Entry;

    @Output() onDelete = new EventEmitter<number>();

    @Output() onChange = new EventEmitter<void>();

    @Input() index: number;

    @Input() pattern: EntryPattern;

    private structure: Structure;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { structure: Structure }) => {
                this.structure = data.structure;
            });
    }

    account(): Account {
        return this.structure.accounts.find(account => account._id === this.entry.account);
    }

    amount(): number {
        return this.entry.change / 100;
    }

    amountChanged(newAmount: number) {
        this.entry.change = Math.round(newAmount * 100);
        this.onChange.emit();
    }

    delete(): void {
        this.onDelete.emit(this.index);
    }

    accountChanged(account: Account): void {
        this.entry.account = account._id;
        this.onChange.emit();
    }

}

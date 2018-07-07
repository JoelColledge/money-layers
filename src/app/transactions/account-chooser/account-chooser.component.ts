import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {Structure, Account} from '../../../../common-types/structure';

@Component({
  selector: 'account-chooser',
  templateUrl: './account-chooser.component.html',
  styleUrls: ['./account-chooser.component.css']
})
export class AccountChooserComponent implements OnInit {
    @Input()
    set account(account: Account) {
        if (account) {
            this.accountName = account.name;
        }
    }

    @Output() accountChange: EventEmitter<Account> = new EventEmitter<Account>();

    @Input() disabled: boolean = false;

    accounts: Account[] = [];
    accountName: string = '';
    accountNames: string[] = [];

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data
            .subscribe((data: { structure: Structure }) => {
                this.accounts = data.structure.accounts;
                this.accountNames = this.accounts.map((account) => account.name);
            });
    }

    public accountNameChanged(accountName: string):void {
        let account: Account = this.accounts.find((account) => account.name === accountName);
        if (account) {
            this.accountChange.emit(account);
        }
    }

}

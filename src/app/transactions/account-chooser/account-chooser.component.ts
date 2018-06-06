import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';

import {
    StructureCacheService
} from '../../shared/structure-cache.service';

import {Account} from '../../../../common-types/structure';

@Component({
  selector: 'account-chooser',
  templateUrl: './account-chooser.component.html',
  styleUrls: ['./account-chooser.component.css']
})
export class AccountChooserComponent implements OnInit {
    @Input()
    set account(account: Account) {
        this.accountName = account.name;
    }

    @Output() accountChange: EventEmitter<Account> = new EventEmitter<Account>();

    @Input() disabled: boolean = false;

    accounts: Account[] = [];
    accountName: string = '';
    accountNames: string[] = [];

    constructor(
        private structureCacheService: StructureCacheService
    ) { }

    ngOnInit() {
        this.accounts = this.structureCacheService.get().accounts;
        this.accountNames = this.accounts.map((account) => account.name);
    }

    public accountNameChanged(accountName: string):void {
        let account: Account = this.accounts.find((account) => account.name === accountName);
        if (account) {
            this.accountChange.emit(account);
        }
    }

}

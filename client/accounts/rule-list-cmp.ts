import {
    Component,
    OnInit
} from '@angular/core';

import {
    RuleService
} from '../services/rule-service';

import {Rule} from '../../common-types/account';

@Component({
    selector: 'rule-list',
    templateUrl: 'accounts/rule-list.html'
})
export class RuleListCmp implements OnInit {
    rules: Rule[] = [];

    constructor(
        private _ruleService: RuleService
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._ruleService
            .getAll()
            .subscribe((rules) => {
                this.rules = rules;
            });
    }

    add(): void {
        this.rules.push(new Rule());
    }
}

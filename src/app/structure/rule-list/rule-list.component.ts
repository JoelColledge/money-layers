import {
    Component,
    OnInit
} from '@angular/core';

import {
    RuleService
} from '../../shared/rule.service';

import {Rule} from '../../../../common-types/account';

@Component({
  selector: 'rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent implements OnInit {
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

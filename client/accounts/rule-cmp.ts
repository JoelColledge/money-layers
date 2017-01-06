import {
    Component,
    Inject,
    Input,
    OnInit
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
    RuleService
} from '../services/rule-service';

import {Rule} from '../../common-types/account';

@Component({
    selector: 'rule',
    templateUrl: 'accounts/rule.html',
    styleUrls: []
})
export class RuleCmp {
    @Input() rule: Rule;

    constructor(
        private _ruleService: RuleService
    ) {
    }

    update(): void {
        this._ruleService
            .addOrUpdate(this.rule)
            .subscribe(rule => this.rule = rule);
    }
}

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
    RuleService
} from '../../shared/rule.service';

import {Rule} from '../../../../common-types/account';

@Component({
  selector: 'rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent {
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

import {
    Component,
    Inject,
    OnInit
} from '@angular/core';

import { TypeaheadMatch } from 'ng2-bootstrap/components/typeahead/typeahead-match.class';

@Component({
    selector: 'account-chooser',
    templateUrl: 'account/templates/account-chooser.html',
    styles: []
})
export class AccountChooserCmp {

  public selected:string = '';
    public states:Array<string> = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
        'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico',
        'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Rhode Island',
        'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
        'Virginia', 'Washington',
        'West Virginia', 'Wisconsin', 'Wyoming'];

          public typeaheadOnSelect(e:TypeaheadMatch):void {
            console.log('Selected value: ', e.value);
          }

}

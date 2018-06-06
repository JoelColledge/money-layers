import {
    Component,
    OnInit
} from '@angular/core';

import {
    StructureService
} from '../../shared/structure.service';

@Component({
  selector: 'structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {
    structure: any = {};

    constructor(
        private _structureService: StructureService
    ) { }

    ngOnInit() {
        this._getAll();
    }

    private _getAll(): void {
        this._structureService
            .get()
            .subscribe(structure => {
                this.structure = structure;
            });
    }

    onChange(value): void {
        console.log('JSON changed', value);
    }

    update(): void {
        this._structureService
            .update(this.structure)
            .subscribe();
    }
}

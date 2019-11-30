import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { JsonEditorComponent } from 'ang-jsoneditor';

import {
    StructureService
} from '../../shared/structure.service';

import {Structure} from '../../../../common-types/structure';

@Component({
  selector: 'structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css']
})
export class StructureComponent implements OnInit {
    structure: any = {};

    @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent;

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

    update(): void {
        this._structureService
            .update(this.editor.get() as any)
            .subscribe();
    }
}

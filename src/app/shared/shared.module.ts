import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { StructureService }   from './structure.service';
import { StructureCacheService } from './structure-cache.service';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [],
    providers: [
        StructureService,
        StructureCacheService,
    ],
})
export class SharedModule { }

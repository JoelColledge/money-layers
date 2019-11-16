import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StructureService }   from './structure.service';
import { StructureCacheService } from './structure-cache.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [],
    providers: [
        StructureService,
        StructureCacheService,
    ],
})
export class SharedModule { }

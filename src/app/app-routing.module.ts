import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StructureCacheService } from './shared/structure-cache.service';
import { StructureComponent }   from './structure/structure/structure.component';
import { StructureModule } from './structure/structure.module';
import { TransactionsPageComponent }   from './transactions/transactions-page/transactions-page.component';
import { TransactionsModule } from './transactions/transactions.module';

const appRoutes: Routes = [
    {
        path: 'structure',
        component: StructureComponent
    },
    {
        path: 'transactions',
        component: TransactionsPageComponent,
        resolve: {
            structure: StructureCacheService
        }
    },
    {
        path: '',
        redirectTo: '/transactions',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        ),
        StructureModule,
        TransactionsModule,
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

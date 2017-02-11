import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StructureCmp }   from './accounts/structure-cmp';
import { AccountCmp }   from './accounts/account-cmp';
import { TransactionsPageCmp }   from './transactions/transactions-page-cmp';

const appRoutes: Routes = [
    {
        path: 'structure',
        component: StructureCmp
    },
    {
        path: 'transactions',
        component: TransactionsPageCmp
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
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

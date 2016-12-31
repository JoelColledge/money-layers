import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountListCmp }   from './accounts/account-list-cmp';
import { AccountCmp }   from './accounts/account-cmp';
import { TransactionListCmp }   from './transactions/transaction-list-cmp';

const appRoutes: Routes = [
    {
        path: 'accounts',
        component: AccountListCmp
    },
    {
        path: 'account/:id',
        component: AccountCmp
    },
    {
        path: 'transactions',
        component: TransactionListCmp
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

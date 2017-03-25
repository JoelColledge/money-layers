import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { StructureCmp }   from './accounts/structure-cmp';
// import { AccountCmp }   from './accounts/account-cmp';
// import { TransactionsPageCmp }   from './transactions/transactions-page-cmp';
import { TransactionsPageComponent }   from './transactions/transactions-page/transactions-page.component';
import { TransactionsModule } from './transactions/transactions.module';

const appRoutes: Routes = [
    // {
    //     path: 'structure',
    //     component: StructureCmp
    // },
    {
        path: 'transactions',
        component: TransactionsPageComponent
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
        TransactionsModule,
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

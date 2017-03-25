import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { StructureCmp }   from './accounts/structure-cmp';
// import { AccountCmp }   from './accounts/account-cmp';
// import { TransactionsPageCmp }   from './transactions/transactions-page-cmp';
import { AccountTotalsComponent }   from './statistics/account-totals/account-totals.component';
import { StatisticsModule } from './statistics/statistics.module';

const appRoutes: Routes = [
    // {
    //     path: 'structure',
    //     component: StructureCmp
    // },
    // {
    //     path: 'transactions',
    //     component: TransactionsPageCmp
    // },
    {
        path: 'transactions',
        component: AccountTotalsComponent
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
        StatisticsModule,
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

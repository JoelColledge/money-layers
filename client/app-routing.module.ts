import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoCmp }   from './todo/components/todo-cmp';
import { AccountListCmp }   from './account/components/account-list-cmp';
import { AccountCmp }   from './account/components/account-cmp';

const appRoutes: Routes = [
    {
        path: 'todos',
        component: TodoCmp
    },
    {
        path: 'accounts',
        component: AccountListCmp
    },
    {
        path: 'account/:id',
        component: AccountCmp
    },
    {
        path: '',
        redirectTo: '/accounts',
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

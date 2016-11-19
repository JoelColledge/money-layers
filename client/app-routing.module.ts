import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoCmp }   from './todo/components/todo-cmp';
import { AccountCmp }   from './account/components/account-cmp';

const appRoutes: Routes = [
    {
        path: 'todos',
        component: TodoCmp
    },
    {
        path: 'accounts',
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

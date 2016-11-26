import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

import { AppCmp }         from './app-cmp';
import { AppRoutingModule }     from './app-routing.module';

import { TodoCmp }   from './todo/components/todo-cmp';
import { TodoService }   from './todo/services/todo-service';

import { AccountListCmp }   from './account/components/account-list-cmp';
import { AccountCmp }   from './account/components/account-cmp';
import { AccountService }   from './account/services/account-service';

import { TransactionListCmp }   from './account/components/transaction-list-cmp';
import { TransactionCmp }   from './account/components/transaction-cmp';
import { TransactionService }   from './account/services/transaction-service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
    ],
    declarations: [
        AppCmp,
        TodoCmp,
        AccountListCmp,
        AccountCmp,
        TransactionListCmp,
        TransactionCmp,
    ],
    providers: [
        TodoService,
        AccountService,
        TransactionService,
    ],
    bootstrap: [
        AppCmp,
    ],
})
export class AppModule {}

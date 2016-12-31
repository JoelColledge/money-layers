import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

import { TypeaheadModule } from 'ng2-bootstrap/components/typeahead';

import { AppCmp }         from './app-cmp';
import { AppRoutingModule }     from './app-routing.module';

import { AccountListCmp }   from './accounts/account-list-cmp';
import { AccountCmp }   from './accounts/account-cmp';
import { AccountChooserCmp }   from './transactions/account-chooser-cmp';

import { TransactionListCmp }   from './transactions/transaction-list-cmp';
import { TransactionCmp }   from './transactions/transaction-cmp';
import { EntryCmp }   from './transactions/entry-cmp';

import { AccountService }   from './services/account-service';
import { TransactionService }   from './services/transaction-service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        TypeaheadModule,
    ],
    declarations: [
        AppCmp,
        AccountListCmp,
        AccountCmp,
        AccountChooserCmp,
        TransactionListCmp,
        TransactionCmp,
        EntryCmp,
    ],
    providers: [
        AccountService,
        TransactionService,
    ],
    bootstrap: [
        AppCmp,
    ],
})
export class AppModule {}

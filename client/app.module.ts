import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

import { TypeaheadModule } from 'ng2-bootstrap/components/typeahead';

import { AppCmp }         from './app-cmp';
import { AppRoutingModule }     from './app-routing.module';

import { StructureCmp }   from './accounts/structure-cmp';
import { AccountListCmp }   from './accounts/account-list-cmp';
import { AccountCmp }   from './accounts/account-cmp';
import { RuleListCmp }   from './accounts/rule-list-cmp';
import { RuleCmp }   from './accounts/rule-cmp';

import { TransactionsPageCmp }   from './transactions/transactions-page-cmp';
import { TransactionListCmp }   from './transactions/transaction-list-cmp';
import { TransactionCmp }   from './transactions/transaction-cmp';
import { EntryCmp }   from './transactions/entry-cmp';
import { AccountChooserCmp }   from './transactions/account-chooser-cmp';

import { AccountTotalsCmp } from './statistics/account-totals-cmp';

import { AccountService }   from './services/account-service';
import { RuleService }   from './services/rule-service';
import { TransactionService }   from './services/transaction-service';
import { StatisticsService }   from './services/statistics-service';

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
        StructureCmp,
        AccountListCmp,
        AccountCmp,
        RuleListCmp,
        RuleCmp,
        TransactionsPageCmp,
        TransactionListCmp,
        TransactionCmp,
        EntryCmp,
        AccountChooserCmp,
        AccountTotalsCmp,
    ],
    providers: [
        AccountService,
        RuleService,
        TransactionService,
        StatisticsService,
    ],
    bootstrap: [
        AppCmp,
    ],
})
export class AppModule {}

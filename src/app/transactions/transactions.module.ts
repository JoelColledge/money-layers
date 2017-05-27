import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

import { DatepickerModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';

import { AccountChooserComponent } from './account-chooser/account-chooser.component';
import { EntryComponent } from './entry/entry.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionService } from './transaction.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DatepickerModule.forRoot(),
        TypeaheadModule.forRoot(),
        StatisticsModule,
    ],
    declarations: [
        AccountChooserComponent,
        EntryComponent,
        TransactionComponent,
        TransactionListComponent,
        TransactionsPageComponent,
    ],
    providers: [
        TransactionService,
    ],
})
export class TransactionsModule { }

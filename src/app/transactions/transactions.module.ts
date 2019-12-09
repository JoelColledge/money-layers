import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { enGbLocale } from 'ngx-bootstrap/locale';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AccountChooserComponent } from './account-chooser/account-chooser.component';
import { EntryComponent } from './entry/entry.component';
import { StatisticsModule } from '../statistics/statistics.module';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionsPageComponent } from './transactions-page/transactions-page.component';
import { TransactionService } from './transaction.service';

defineLocale('engb', enGbLocale);

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        BsDatepickerModule.forRoot(),
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
export class TransactionsModule {
    constructor(private bsLocaleService: BsLocaleService) {
        this.bsLocaleService.use('engb');
    }
}

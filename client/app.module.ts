import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, FormBuilder } from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';

import { AppCmp }         from './app-cmp';
import { AppRoutingModule }     from './app-routing.module';

import { TodoCmp }   from './todo/components/todo-cmp';
import { TodoService }   from './todo/services/todo-service';

import { AccountCmp }   from './account/components/account-cmp';
import { AccountService }   from './account/services/account-service';

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
        AccountCmp,
    ],
    providers: [
        TodoService,
        AccountService,
    ],
    bootstrap: [
        AppCmp,
    ],
})
export class AppModule {}

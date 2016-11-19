"use strict";

import * as express from 'express';
import {AccountController} from '../controller/account-controller';

export class AccountRoutes {
    static init(router: express.Router) {
      router
        .route('/api/accounts')
        .get(AccountController.getAll)
        .post(AccountController.createAccount);

      router
        .route('/api/accounts/:id')
        .get(AccountController.get)
        .post(AccountController.updateAccount);
    }
}

"use strict";

import * as express from 'express';
import {TransactionController} from '../controller/transaction-controller';

export class TransactionRoutes {
    static init(router: express.Router) {
      router
        .route('/api/transactions')
        .get(TransactionController.getAll)
        .post(TransactionController.createTransaction);

      router
        .route('/api/transactions/:id')
        .get(TransactionController.get)
        .post(TransactionController.updateTransaction)
        .delete(TransactionController.deleteTransaction);
    }
}

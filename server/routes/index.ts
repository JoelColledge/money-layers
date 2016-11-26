import * as express from 'express';
import {TodoRoutes} from '../api/todo/routes/todo-routes';
import {AccountRoutes} from '../api/account/routes/account-routes';
import {TransactionRoutes} from '../api/account/routes/transaction-routes';

import {StaticDispatcher} from '../commons/static/index';


export class Routes {
   static init(app: express.Application, router: express.Router) {
     TodoRoutes.init(router);
     AccountRoutes.init(router);
     TransactionRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);


     app.use('/', router);
   }
}

import * as express from 'express';
import {StructureRoutes} from '../api/account/routes/structure-routes';
import {TransactionRoutes} from '../api/account/routes/transaction-routes';

import {StaticDispatcher} from '../commons/static/index';


export class Routes {
   static init(app: express.Application, router: express.Router) {
     StructureRoutes.init(router);
     TransactionRoutes.init(router);

     router
       .route('*')
       .get(StaticDispatcher.sendIndex);


     app.use('/', router);
   }
}

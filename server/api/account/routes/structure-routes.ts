"use strict";

import * as express from 'express';
import {StructureController} from '../controller/structure-controller';

export class StructureRoutes {
    static init(router: express.Router) {
      router
        .route('/api/structure')
        .get(StructureController.get)
        .put(StructureController.update);
    }
}

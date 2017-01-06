"use strict";

import * as express from 'express';
import {RuleController} from '../controller/rule-controller';

export class RuleRoutes {
    static init(router: express.Router) {
      router
        .route('/api/rules')
        .get(RuleController.getAll)
        .post(RuleController.createRule);

      router
        .route('/api/rules/:id')
        .get(RuleController.get)
        .post(RuleController.updateRule)
        .delete(RuleController.deleteRule);
    }
}

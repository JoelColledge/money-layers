import * as express from 'express';
import RuleDao from '../dao/rule-dao';

export class RuleController {
    static getAll(req: express.Request, res: express.Response): void {
        RuleDao.getAll()
            .then(rules => res.status(200).json(rules))
            .catch(error => res.status(400).json(error));
    }

    static get(req: express.Request, res: express.Response): void {
        let _id = req.params.id;

        RuleDao.get(_id)
            .then(rule => res.status(200).json(rule))
            .catch(error => res.status(400).json(error));
    }

    static createRule(req: express.Request, res: express.Response): void {
        let _rule = req.body;

        RuleDao.createRule(_rule)
            .then(rule => res.status(201).json(rule))
            .catch(error => res.status(400).json(error));
    }

    static updateRule(req: express.Request, res: express.Response): void {
        let _rule = req.body;
        if (req.params.id !== _rule._id) {
            res.status(400).json({ error: 'IDs in path and body do not match' });
            return;
        }

        RuleDao.updateRule(_rule)
            .then(rule => res.status(200).json(rule))
            .catch(error => res.status(400).json(error));
    }

    static deleteRule(req: express.Request, res: express.Response): void {
        let _id = req.params.id;

        RuleDao.deleteRule(_id)
            .then(() => res.status(200).end())
            .catch(error => res.status(400).json(error));
    }
}

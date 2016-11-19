import * as express from 'express';
import AccountDao from '../dao/account-dao';

export class AccountController {
    static getAll(req: express.Request, res: express.Response): void {
        AccountDao.getAll()
            .then(accounts => res.status(200).json(accounts))
            .catch(error => res.status(400).json(error));
    }

    static createAccount(req: express.Request, res: express.Response): void {
        let _account = req.body;

        console.log(_account);

        AccountDao.createAccount(_account)
            .then(account => res.status(201).json(account))
            .catch(error => res.status(400).json(error));
    }

    static updateAccount(req: express.Request, res: express.Response): void {
        let _account = req.body;
        if (req.params.id !== _account._id) {
            res.status(400).json({ error: 'IDs in path and body do not match' });
            return;
        }

        AccountDao.updateAccount(_account)
            .then(() => res.status(200).end())
            .catch(error => res.status(400).json(error));
    }
}

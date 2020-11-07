import * as express from 'express';
import TransactionDao from '../dao/transaction-dao';
import ImportService from '../service/import-service';

export class TransactionController {
    static getAll(req: express.Request, res: express.Response): void {
        TransactionDao.getAll(+req.query.month.toString())
            .then(transactions => res.status(200).json(transactions))
            .catch(error => res.status(400).json(error));
    }

    static get(req: express.Request, res: express.Response): void {
        let _id = req.params.id;

        TransactionDao.get(_id)
            .then(transaction => res.status(200).json(transaction))
            .catch(error => res.status(400).json(error));
    }

    static accountTotals(req: express.Request, res: express.Response): void {
        TransactionDao.accountTotals()
            .then(totals => res.status(200).json(totals))
            .catch(error => res.status(400).json(error));
    }

    static changeByMonth(req: express.Request, res: express.Response): void {
        TransactionDao.changeByMonth()
            .then(changeByMonth => res.status(200).json(changeByMonth))
            .catch(error => res.status(400).json(error));
    }

    static createTransaction(req: express.Request, res: express.Response): void {
        let _transaction = req.body;

        TransactionDao.createTransaction(_transaction)
            .then(transaction => res.status(201).json(transaction))
            .catch(error => res.status(400).json(error));
    }

    static updateTransaction(req: express.Request, res: express.Response): void {
        let _transaction = req.body;
        if (req.params.id !== _transaction._id) {
            res.status(400).json({ error: 'IDs in path and body do not match' });
            return;
        }

        TransactionDao.updateTransaction(_transaction)
            .then(transaction => res.status(200).json(transaction))
            .catch(error => res.status(400).json(error));
    }

    static deleteTransaction(req: express.Request, res: express.Response): void {
        let _id = req.params.id;

        TransactionDao.deleteTransaction(_id)
            .then(() => res.status(200).end())
            .catch(error => res.status(400).json(error));
    }

    static goodbudgetImport(req: express.Request, res: express.Response): void {
        ImportService.goodbudgetImport(req.body);

        res.status(200).end();
    }
}

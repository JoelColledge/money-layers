import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import AccountDao from './account-dao';
import transactionSchema from '../model/transaction-model';
import {Transaction, dateToMonth, prepareTransactionForIndex} from '../../../../common-types/transaction';
import {AccountTotal, MonthChange} from '../../../../common-types/statistics';

interface TransactionDocument extends mongoose.Document, Transaction {
}

namespace TransactionDao {

    export function getAll(month: number): Promise<Transaction[]> {
        return new Promise<Transaction[]>((resolve, reject) => {
            month = month || dateToMonth(new Date());

            let _query = {
                month: month
            };

            TransactionModel
                .find(_query)
                .sort('-date')
                .exec((err, transactions) => {
                    err ? reject(err)
                        : resolve(transactions);
                });
        });
    };

    export function get(id: string): Promise<Transaction> {
        return new Promise<Transaction>((resolve, reject) => {
            TransactionModel
                .findById(id)
                .exec((err, transaction) => {
                    err ? reject(err)
                        : resolve(transaction);
                });
        });
    };

    export function accountTotals(): Promise<AccountTotal[]> {
        return new Promise<AccountTotal[]>((resolve, reject) => {
            let _aggregation = [
                {
                    $unwind: "$entries"
                },
                {
                    $group: {_id: "$entries.account", total: {$sum: "$entries.change"}}
                }
            ];

            TransactionModel
                .aggregate(_aggregation, (err, result) => {
                    err ? reject(err)
                        : resolve(result.map((agg) => {
                            let totals = {account: agg._id, total: agg.total};
                            return totals;
                        }));
                });
        });
    };

    export function changeByMonth(): Promise<MonthChange[]> {
        return AccountDao.getAll()
            .then(accounts => {
                return new Promise<MonthChange[]>((resolve, reject) => {
                    let actualInternalAccountIds = accounts.filter(account => account.groups.includes('a/in')).map(account => account._id);
                    console.log(actualInternalAccountIds);

                    let _aggregation = [
                        {
                            $unwind: "$entries"
                        },
                        {
                            $match: { "entries.account": { $in: actualInternalAccountIds } }
                        },
                        {
                            $group: {_id: "$month", change: {$sum: "$entries.change"}}
                        },
                        {
                            $sort: {_id: 1}
                        }
                    ];

                    TransactionModel
                        .aggregate(_aggregation, (err, result) => {
                            err ? reject(err)
                                : resolve(result.map((agg) => {
                                    let changeByMonth = {month: agg._id, change: agg.change};
                                    return changeByMonth;
                                }));
                        });
                });
        });
    };

    export function createTransaction(transaction: Transaction): Promise<Transaction> {
        return new Promise<Transaction>((resolve, reject) => {
            if (!_.isObject(transaction)) {
                return reject(new TypeError('Transaction is not a valid object.'));
            }

            prepareTransactionForIndex(transaction);
            delete transaction._id;

            TransactionModel
                .create(transaction,
                    (err, saved) => {
                        err ? reject(err)
                            : resolve(saved);
                    }
                );
        });
    };

    export function updateTransaction(transaction: Transaction): Promise<Transaction> {
        return new Promise<Transaction>((resolve, reject) => {
            if (!_.isObject(transaction)) {
                return reject(new TypeError('Transaction is not a valid object.'));
            }
            if (!_.isString(transaction._id)) {
                return reject(new TypeError('Id is not a valid string.'));
            }

            prepareTransactionForIndex(transaction);

            TransactionModel
                .findByIdAndUpdate(transaction._id, transaction, {new: true})
                .exec((err, updated) => {
                    err ? reject(err)
                        : resolve(updated);
                });
        });
    };

    export function deleteTransaction(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!_.isString(id)) {
                return reject(new TypeError('Id is not a valid string.'));
            }

            TransactionModel
                .remove({_id: id},
                    (err) => {
                        console.log('Transaction remove returned ', err);
                        err ? reject(err)
                            : resolve();
                    }
                );
        });
    };
}

let TransactionModel = mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export default TransactionDao;

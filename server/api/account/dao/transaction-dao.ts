import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import transactionSchema from '../model/transaction-model';
import {Transaction} from '../../../../common-types/transaction';
import {AccountTotal} from '../../../../common-types/statistics';

interface TransactionDocument extends mongoose.Document, Transaction {
}

namespace TransactionDao {

    export function getAll(): Promise<Transaction[]> {
        return new Promise<Transaction[]>((resolve, reject) => {
            let _query = {};

            TransactionModel
                .find(_query)
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

    export function createTransaction(transaction: Transaction): Promise<Transaction> {
        return new Promise<Transaction>((resolve, reject) => {
            if (!_.isObject(transaction)) {
                return reject(new TypeError('Transaction is not a valid object.'));
            }

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

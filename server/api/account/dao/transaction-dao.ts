import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import StructureDao from './structure-dao';
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
        return StructureDao.get()
            .then(structure => {
                return new Promise<MonthChange[]>((resolve, reject) => {
                    let actualInternalAccountIds = structure.accounts.filter(account => account.groups.includes('a/in')).map(account => account._id);

                    let _aggregation = [
                        {
                            // Process the individual transactions
                            $project: {
                                "month": true,
                                // Total actual internal change for this transaction
                                "transactionChange": {
                                    $sum: {
                                        // Extract the changes from the entries
                                        $map: {
                                            input: {
                                                // Only include changes for the actual internal accounts
                                                $filter: {
                                                    input: "$entries",
                                                    as: "entry",
                                                    cond: {
                                                        $in: ["$$entry.account", actualInternalAccountIds]
                                                    }
                                                }
                                            },
                                            as: "entry",
                                            in: "$$entry.change"
                                        }
                                    }
                                }
                            }
                        },
                        {
                            // Sum up the positive and negative changes separately for each month
                            $group: {
                                _id: {
                                    month: "$month",
                                    positive: { $gt: ["$transactionChange", 0] }
                                },
                                totalChange: { $sum: "$transactionChange" }
                            }
                        },
                        {
                            // Group the results by month
                            $group: {
                                _id: "$_id.month",
                                changes: {
                                    $push: "$totalChange"
                                }
                            }
                        },
                        {
                            $sort: { "_id": -1 }
                        },
                        {
                            $limit: 12
                        },
                        {
                            $sort: { "_id": 1 }
                        }
                    ];

                    TransactionModel
                        .aggregate(_aggregation, (err, result) => {
                            err ? reject(err)
                                : resolve(result.map((agg) => {
                                    return {
                                        month: agg._id,
                                        increase: agg.changes.find(v => v > 0) || 0,
                                        decrease: Math.abs(agg.changes.find(v => v < 0) || 0)
                                    };
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

import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import transactionSchema from '../model/transaction-model';
import {ITransaction} from '../../../../common-types/transaction';

interface TransactionDocument extends mongoose.Document, ITransaction {
}

namespace TransactionDao {

    export function getAll(): Promise<ITransaction[]> {
        return new Promise<ITransaction[]>((resolve, reject) => {
            let _query = {};

            TransactionModel
                .find(_query)
                .exec((err, transactions) => {
                    err ? reject(err)
                        : resolve(transactions);
                });
        });
    };

    export function get(id: string): Promise<ITransaction> {
        return new Promise<ITransaction>((resolve, reject) => {
            let _query = {};

            TransactionModel
                .findById(id)
                .exec((err, transaction) => {
                    err ? reject(err)
                        : resolve(transaction);
                });
        });
    };

    export function createTransaction(transaction: ITransaction): Promise<ITransaction> {
        return new Promise<ITransaction>((resolve, reject) => {
            if (!_.isObject(transaction)) {
                return reject(new TypeError('Transaction is not a valid object.'));
            }

            var _transaction = new TransactionModel(transaction);

            TransactionModel
                .create(transaction,
                    (err, saved) => {
                        err ? reject(err)
                            : resolve(saved);
                    }
                );
        });
    };

    export function updateTransaction(transaction: ITransaction): Promise<ITransaction> {
        return new Promise<ITransaction>((resolve, reject) => {
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
}

let TransactionModel = mongoose.model<TransactionDocument>('Transaction', transactionSchema);

export default TransactionDao;

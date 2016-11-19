import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import accountSchema from '../model/account-model';
import {IAccount} from '../../../../common-types/account';

interface AccountDocument extends mongoose.Document, IAccount {
}

namespace AccountDao {

    export function getAll(): Promise<IAccount[]> {
        return new Promise<IAccount[]>((resolve, reject) => {
            let _query = {};

            AccountModel
                .find(_query)
                .exec((err, accounts) => {
                    err ? reject(err)
                        : resolve(accounts);
                });
        });
    };

    export function createAccount(account: IAccount): Promise<IAccount> {
        return new Promise<IAccount>((resolve, reject) => {
            if (!_.isObject(account)) {
                return reject(new TypeError('Account is not a valid object.'));
            }

            var _account = new AccountModel(account);

            AccountModel
                .create(account,
                    (err, saved) => {
                        err ? reject(err)
                            : resolve(saved);
                    }
                );
        });
    };

    export function updateAccount(account: IAccount): Promise<IAccount> {
        return new Promise<IAccount>((resolve, reject) => {
            if (!_.isObject(account)) {
                return reject(new TypeError('Account is not a valid object.'));
            }
            if (!_.isString(account._id)) {
                return reject(new TypeError('Id is not a valid string.'));
            }

            AccountModel
                .findByIdAndUpdate(account._id, account)
                .exec((err, updated) => {
                    err ? reject(err)
                        : resolve(updated);
                });
        });
    };
}

let AccountModel = mongoose.model<AccountDocument>('Account', accountSchema);

export default AccountDao;

import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import ruleSchema from '../model/rule-model';
import {Rule} from '../../../../common-types/account';

interface RuleDocument extends mongoose.Document, Rule {
}

namespace RuleDao {

    export function getAll(): Promise<Rule[]> {
        return new Promise<Rule[]>((resolve, reject) => {
            let _query = {};

            RuleModel
                .find(_query)
                .exec((err, rules) => {
                    err ? reject(err)
                        : resolve(rules);
                });
        });
    };

    export function get(id: string): Promise<Rule> {
        return new Promise<Rule>((resolve, reject) => {
            let _query = {};

            RuleModel
                .findById(id)
                .exec((err, rule) => {
                    err ? reject(err)
                        : resolve(rule);
                });
        });
    };

    export function createRule(rule: Rule): Promise<Rule> {
        return new Promise<Rule>((resolve, reject) => {
            if (!_.isObject(rule)) {
                return reject(new TypeError('Rule is not a valid object.'));
            }

            var _rule = new RuleModel(rule);

            RuleModel
                .create(rule,
                    (err, saved) => {
                        err ? reject(err)
                            : resolve(saved);
                    }
                );
        });
    };

    export function updateRule(rule: Rule): Promise<Rule> {
        return new Promise<Rule>((resolve, reject) => {
            if (!_.isObject(rule)) {
                return reject(new TypeError('Rule is not a valid object.'));
            }
            if (!_.isString(rule._id)) {
                return reject(new TypeError('Id is not a valid string.'));
            }

            RuleModel
                .findByIdAndUpdate(rule._id, rule, {new: true})
                .exec((err, updated) => {
                    err ? reject(err)
                        : resolve(updated);
                });
        });
    };

    export function deleteRule(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!_.isString(id)) {
                return reject(new TypeError('Id is not a valid string.'));
            }

            RuleModel
                .remove({_id: id},
                    (err) => {
                        console.log('Rule remove returned ', err);
                        err ? reject(err)
                            : resolve();
                    }
                );
        });
    };
}

let RuleModel = mongoose.model<RuleDocument>('Rule', ruleSchema);

export default RuleDao;

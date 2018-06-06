import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import structureSchema from '../model/structure-model';
import {Structure} from '../../../../common-types/structure';

interface StructureDocument extends mongoose.Document, Structure {
}

namespace StructureDao {

    export function get(): Promise<Structure> {
        return new Promise<Structure>((resolve, reject) => {
            StructureModel
                .find()
                .exec((err, structures) => {
                    err ? reject(err)
                        : resolve(structures[0]);
                });
        });
    };

    export function update(structure: Structure): Promise<Structure> {
        return new Promise<Structure>((resolve, reject) => {
            if (!_.isObject(structure)) {
                return reject(new TypeError('Structure is not a valid object.'));
            }

            StructureModel
                .findByIdAndUpdate(structure._id, structure, {new: true})
                .exec((err, updated) => {
                    err ? reject(err)
                        : resolve(updated);
                });
        });
    };
}

let StructureModel = mongoose.model<StructureDocument>('Structure', structureSchema, 'structure');

export default StructureDao;

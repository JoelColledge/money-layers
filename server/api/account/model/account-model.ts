import * as mongoose from 'mongoose';

var schema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    layer: {type: String, required: true},
    active: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now},
    groups: {type: [String], default: []}
});

export default schema;

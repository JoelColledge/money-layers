import * as mongoose from 'mongoose';

var schema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    active: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now}
});

export default schema;
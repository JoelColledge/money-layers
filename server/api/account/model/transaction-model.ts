import * as mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

var entrySchema = new mongoose.Schema({
    account: {type: ObjectId, required: true},
    change: {type: Number, required: true}
});

var schema = new mongoose.Schema({
    description: {type: String, required: true, trim: true},
    date: {type: Date, required: true},
    entries: [entrySchema],
    createdAt: {type: Date, default: Date.now}
});

export default schema;

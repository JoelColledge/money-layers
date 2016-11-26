import * as mongoose from 'mongoose';

var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
    description: {type: String, required: true, trim: true},
    date: {type: Date, required: true},
    // entries: [
    //     {account: ObjectId, required: true},
    //     {change: Number, required: true}
    // ],
    createdAt: {type: Date, default: Date.now}
});

export default schema;

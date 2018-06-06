import * as mongoose from 'mongoose';

var ruleSchema = new mongoose.Schema({
    groupLeft: {type: String, required: true},
    groupRight: {type: String, required: true}
});

var accountSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    active: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now},
    groups: {type: [String], default: []},
    order: {type: Number, default: 0},
    showInList: {type: Boolean, default: true},
    icon: {type: String, default: "", trim: true}
});

var schema = new mongoose.Schema({
    accounts: [accountSchema],
    rules: [ruleSchema]
});

export default schema;

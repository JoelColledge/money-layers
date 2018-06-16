import * as mongoose from 'mongoose';

var typeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    display: {type: String, required: true}
});

var accountSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    active: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now},
    type: {type: String, default: ""},
    order: {type: Number, default: 0},
    icon: {type: String, default: "", trim: true}
});

var ruleSchema = new mongoose.Schema({
    typesLeft: {type: [String], required: true},
    typesRight: {type: [String], required: true}
});

var schema = new mongoose.Schema({
    types: [typeSchema],
    accountTotalTypes: [String],
    accounts: [accountSchema],
    rules: [ruleSchema]
});

export default schema;

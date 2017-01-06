import * as mongoose from 'mongoose';

var schema = new mongoose.Schema({
    groupLeft: {type: String, required: true},
    groupRight: {type: String, required: true}
});

export default schema;

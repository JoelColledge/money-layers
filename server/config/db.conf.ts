"use strict";

import * as mongoose from 'mongoose';
var dbConst = require('../constants/db.json');

export class DBConfig {
    static init():void {
      const URL = (process.env.NODE_ENV === 'production') ? process.env.MONGODB_URI
                                                          : dbConst.localhost;

      mongoose.set('useFindAndModify', false);
      mongoose.set('useUnifiedTopology', true);
      mongoose.connect(URL, { useNewUrlParser: true });
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));
    }
};

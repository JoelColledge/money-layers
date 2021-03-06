"use strict";

import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as zlib from 'zlib';

export class RoutesConfig {
    static init(application: express.Application):void {
        let _root = process.cwd();
        let _clientFiles = '/dist/';

        let username = process.env.USERNAME;
        let password = process.env.PASSWORD;
        if (!username || !password) {
            throw new Error('No credentials specified');
        }
        let users = {};
        users[username] = password;
        application.use(basicAuth({
            users: users,
            challenge: true
        }));
        application.use(helmet());

        application.use(compression({
            level: zlib.Z_BEST_COMPRESSION,
            threshold: '1kb'
        }));

        application.use(express.static(_root + _clientFiles));
        application.use(bodyParser.json());
        application.use(bodyParser.text({ type: 'text/csv' }));
        application.use(morgan('dev'));
    }
}

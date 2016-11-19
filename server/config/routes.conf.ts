"use strict";

import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as zlib from 'zlib';

export class RoutesConfig {
    static init(application: express.Application):void {
        let _root = process.cwd();
        let _nodeModules = '/node_modules/';
        let _clientFiles = (process.env.NODE_ENV === 'production') ? '/build/client/dist/' : '/build/client/dev/';
        let _sourceFiles = '/client/dev/';

        application.use(compression({
            level: zlib.Z_BEST_COMPRESSION,
            threshold: '1kb'
        }));

        application.use(express.static(_root + _nodeModules));
        application.use(express.static(_root + _clientFiles));
        application.use(express.static(_root + _sourceFiles));
        application.use(bodyParser.json());
        application.use(morgan('dev'));
        application.use(helmet());
    }
}
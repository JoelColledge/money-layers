"use strict";

import * as express from 'express';
import * as fs from 'fs';

export class StaticDispatcher {
    static sendIndex(req: express.Request, res: express.Response):void {
      let _root = process.cwd();

      res.type('.html');

      fs.createReadStream(_root + '/dist/index.html')
        .pipe(res);
    }
}

import * as express from 'express';
import StructureDao from '../dao/structure-dao';

export class StructureController {
    static get(req: express.Request, res: express.Response): void {
        StructureDao.get()
            .then(structure => res.status(200).json(structure))
            .catch(error => res.status(400).json(error));
    }

    static update(req: express.Request, res: express.Response): void {
        let _structure = req.body;

        StructureDao.update(_structure)
            .then(structure => res.status(200).json(structure))
            .catch(error => res.status(400).json(error));
    }
}

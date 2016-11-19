import * as express from 'express';
import TodoDao from '../dao/todo-dao';

export class TodoController {
  static getAll(req: express.Request, res: express.Response):void {
      TodoDao.getAll()
        .then(todos => res.status(200).json(todos))
        .catch(error => res.status(400).json(error));
  }

  static createTodo(req: express.Request, res: express.Response):void {
      let _todo = req.body;

      TodoDao.createTodo(_todo)
        .then(todo => res.status(201).json(todo))
        .catch(error => res.status(400).json(error));
  }

  static deleteTodo(req: express.Request, res: express.Response):void {
    let _id = req.params.id;

    TodoDao.deleteTodo(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}

import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import todoSchema from '../model/todo-model';
import Todo from '../../../../common-types/todo';

interface TodoDocument extends mongoose.Document, Todo {
}

namespace TodoDao {

    export function getAll(): Promise<Todo[]> {
        return new Promise<Todo[]>((resolve, reject) => {
            let _query = {};

            TodoModel
              .find(_query)
              .exec((err, todos) => {
                  err ? reject(err)
                      : resolve(todos);
              });
        });
    };

    export function createTodo(todo:Todo): Promise<Todo> {
        return new Promise<Todo>((resolve, reject) => {
          if (!_.isObject(todo)) {
            return reject(new TypeError('Todo is not a valid object.'));
          }

          var _todo = new TodoModel(todo);

          TodoModel
            .create(todo,
              (err, saved) => {
                err ? reject(err)
                    : resolve(saved);
          });
        });
    };

    export function deleteTodo(id:string): Promise<{}> {
        return new Promise<{}>((resolve, reject) => {
            if (!_.isString(id)) {
                return reject(new TypeError('Id is not a valid string.'));
            }

            TodoModel
              .findByIdAndRemove(id)
              .exec((err, deleted) => {
                  err ? reject(err)
                      : resolve();
              });
        });
    };
}

let TodoModel = mongoose.model<TodoDocument>('Todo', todoSchema);

export default TodoDao;
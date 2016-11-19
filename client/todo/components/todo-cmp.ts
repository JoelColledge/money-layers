import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  TodoService
} from '../services/todo-service';

import {ITodo, Todo} from '../../../common-types/todo';

@Component({
  selector: 'todo-cmp',
  templateUrl: 'todo/templates/todo.html',
  styleUrls: ['todo/styles/todo.css']
})
export class TodoCmp implements OnInit {
  title: string = "ng2do";
  todos: ITodo[] = [];
  todoForm: Todo;

  constructor(private _todoService: TodoService) {
    this.todoForm = new Todo();
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll(): void {
    this._todoService
        .getAll()
        .subscribe((todos) => {
          this.todos = todos;
        });
  }

  add(todo: ITodo): void {
    this._todoService
        .add(todo)
        .subscribe((m) => {
          this.todos.push(m);
          this.todoForm = new Todo();
        });
  }

  remove(id: string): void {
    this._todoService
      .remove(id)
      .subscribe(() => {
        this.todos.forEach((t, i) => {
          if (t._id === id)
            return this.todos.splice(i, 1);
        });
      })
  }
}

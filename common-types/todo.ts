
export interface ITodo {
  todoMessage: string;
  _id: any;
}

export class Todo implements ITodo {
  constructor(
    public todoMessage: string = "",
    public _id: any = undefined
  ) { }
}

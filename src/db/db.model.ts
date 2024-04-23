import Dexie from "dexie";

class MyDatabase extends Dexie {
  lists: Dexie.Table<IList, number>;
  todos: Dexie.Table<ITodo, number>;

  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      lists: "++id,title,listId,seq",
      todos: "++id,title,listId,seq",
    });

    this.lists = this.table("lists");
    this.todos = this.table("todos");
  }
}

interface IList {
  id?: number;
  title: string;
  listId?: number;
  seq?: number;
}

interface ITodo {
  id?: number;
  title: string;
  listId?: number;
  seq?: number;
}

const db = new MyDatabase();
export default db;

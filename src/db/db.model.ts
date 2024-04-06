import Dexie from "dexie";

class MyDatabase extends Dexie {
  lists: Dexie.Table<IList, number>;
  todos: Dexie.Table<ITodo, number>;

  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      lists: "++id,title,listId,Seq",
      todos: "++id,title,listId,Seq",
    });

    this.lists = this.table("lists");
    this.todos = this.table("todos");
  }
}

interface IList {
  id?: number;
  title: string;
  listId?: number;
  Seq?: number;
}

interface ITodo {
  id?: number;
  title: string;
  listId?: number;
  Seq?: number;
}

const db = new MyDatabase();
export default db;

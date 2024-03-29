import Dexie from "dexie";

class MyDatabase extends Dexie {
  lists: Dexie.Table<IList, number>;
  todos: Dexie.Table<ITodo, number>;

  constructor() {
    super("MyDatabase");
    this.version(1).stores({
      lists: "++id,title,listNum,Seq",
      todos: "++id,title,listNum,Seq",
    });

    this.lists = this.table("lists");
    this.todos = this.table("todos");
  }
}

interface IList {
  id?: number;
  title: string;
  listNum?: number;
  Seq?: number;
}

interface ITodo {
  id?: number;
  title: string;
  listNum?: number;
  Seq?: number;
}

const db = new MyDatabase();
export default db;

// import
import { rest } from "msw"; // msw 1.0v 기준
const initialLists = [
  {
    id: 1,
    listSeq: 1, // todo 리스트 순서
    listName: "first", //리스트 이름
    todoList: 1, // List ID
  },
  {
    id: 2,
    listSeq: 2,
    listName: "second",
    todoList: 2,
  },
  {
    id: 3,
    listSeq: 3,
    listName: "third",
    todoList: 3,
  },
];
const initialTodos = [
  {
    id: 1,
    text: "Learn React",
    list: 1,
  },
  {
    id: 2,
    text: "Learn Node.js",
    list: 1,
  },
  {
    id: 3,
    text: "Learn React33",
    list: 2,
  },
];

// component
export const handlers = [
  rest.post("http://localhost:3000/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Login successful" }));
  }),
];

export const todoHandlers = [
  rest.get("http://localhost:3000/todoLists", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        todos: initialTodos,
        lists: initialLists,
      }),
    );
  }),
];
interface AddTodoList {
  title: string;
  listNum: number;
  Seq: number;
}

export const addTodo = [
  rest.post<AddTodoList>(
    "http://localhost:3000/todo",
    async (req, res, ctx) => {
      const { title, listNum } = req.body;
      const id = await db.lists.add({ title });
      await db.todos.add({ title, listNum, Seq: id });

      const todos = await db.todos.orderBy("Seq").toArray();
      return res(ctx.status(200), ctx.json({ todos: todos }));
    },
  ),
];

export const addList = [
  rest.post<AddTodoList>(
    "http://localhost:3000/list",
    async (req, res, ctx) => {
      const { title } = req.body;
      const id = await db.lists.add({ title });
      await db.lists.update(id, { listNum: id, Seq: id });

      const lists = await db.lists.orderBy("Seq").toArray();
      return res(ctx.status(200), ctx.json({ lists }));
    },
  ),
];

export const updateTodoList = [
  rest.post<UpdateTodoListProps>(
    "http://localhost:3000/todoList",
    async (req, res, ctx) => {
      const { todos, lists } = req.body;
      if (lists.length) {
        for (let index = 0; index < lists.length; index++) {
          await db.lists.update(lists[index].id, { Seq: index });
        }
      }

      if (todos.length) {
        for (let index = 0; index < todos.length; index++) {
          await db.todos.update(todos[index].id, { Seq: index });
        }
      }

      const listsUpdate = await db.lists.orderBy("Seq").toArray();
      const todosUpdate = await db.todos.orderBy("Seq").toArray();
      return res(
        ctx.status(200),
        ctx.json({ todos: todosUpdate, lists: listsUpdate }),
      );
    },
  ),
];

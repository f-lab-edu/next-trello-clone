// import
import { rest } from "msw"; // msw 1.0v 기준
import db from "@/db/db.model";
const initialLists = [
  // {
  //   id: 1, //Unique Key
  //   title: "first", //리스트 이름
  //   listNum: 1, // List ID
  //   Seq: 0,
  // },
  // {
  //   id: 2,
  //   title: "second",
  //   listNum: 2,
  //   Seq: 1,
  // },
  // {
  //   id: 3,
  //   title: "third",
  //   listNum: 3,
  //   Seq: 2,
  // },
];
const initialTodos = [
  // {
  //   id: 1,
  //   title: "Learn React",
  //   listNum: 1,
  //   Seq: 0,
  // },
  // {
  //   id: 2,
  //   title: "Learn Node.js",
  //   listNum: 1,
  //   Seq: 1,
  // },
  // {
  //   id: 3,
  //   title: "Learn React33",
  //   listNum: 2,
  //   Seq: 2,
  // },
];

// db.lists.bulkPut(initialLists);
// db.todos.bulkPut(initialTodos);

interface DataValues {
  id: number;
  title: string;
  listNum: number;
  Seq: number;
}

interface UpdateTodoListProps {
  todos: DataValues[];
  lists: DataValues[];
}
// component
export const handlers = [
  rest.post("http://localhost:3000/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Login successful" }));
  }),
];

export const todoHandlers = [
  rest.get("http://localhost:3000/todoLists", async (req, res, ctx) => {
    const todos = await db.todos.orderBy("Seq").toArray();
    const lists = await db.lists.orderBy("Seq").toArray();
    return res(
      ctx.status(200),
      ctx.json({
        todos: todos,
        lists: lists,
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
    "http://localhost:3000/addTodo",
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
    "http://localhost:3000/addList",
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
    "http://localhost:3000/updateTodoList",
    async (req, res, ctx) => {
      let { todos, lists } = req.body;
      for (let index = 0; index < lists.length; index++) {
        lists[index] = {
          ...lists[index],
          Seq: index,
        };
      }

      for (let index = 0; index < todos.length; index++) {
        todos[index] = {
          ...todos[index],
          Seq: index,
        };
      }

      await db.lists.clear();
      await db.todos.clear();

      await db.lists.bulkPut(lists);
      await db.todos.bulkPut(todos);
      const listsUpdate = await db.lists.orderBy("Seq").toArray();
      const todosUpdate = await db.todos.orderBy("Seq").toArray();
      return res(
        ctx.status(200),
        ctx.json({ todos: todosUpdate, lists: listsUpdate }),
      );
    },
  ),
];

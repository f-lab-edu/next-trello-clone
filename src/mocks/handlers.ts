// import
import { rest } from "msw"; // msw 1.0v 기준
import db from "@/db/db.model";
// const initialLists = [
//   {
//     id: 1, //Unique Key
//     title: "first", //리스트 이름
//     listNum: 1, // List ID
//     Seq: 0,
//   },
//   {
//     id: 2,
//     title: "second",
//     listNum: 2,
//     Seq: 1,
//   },
//   {
//     id: 3,
//     title: "third",
//     listNum: 3,
//     Seq: 2,
//   },
//   {
//     id: 4,
//     title: "fourth",
//     listNum: 4,
//     Seq: 3,
//   },
//   {
//     id: 5,
//     title: "fifth",
//     listNum: 5,
//     Seq: 4,
//   },
//   {
//     id: 6,
//     title: "sixth",
//     listNum: 6,
//     Seq: 5,
//   },
//   {
//     id: 7,
//     title: "seventh",
//     listNum: 7,
//     Seq: 6,
//   },
//   {
//     id: 8,
//     title: "eighth",
//     listNum: 8,
//     Seq: 7,
//   },
//   {
//     id: 9,
//     title: "nineth",
//     listNum: 9,
//     Seq: 8,
//   },
//   {
//     id: 10,
//     title: "Tenth",
//     listNum: 10,
//     Seq: 9,
//   },
//   {
//     id: 11,
//     title: "Eleventh",
//     listNum: 11,
//     Seq: 10,
//   },
//   {
//     id: 12,
//     title: "Twelveth",
//     listNum: 12,
//     Seq: 11,
//   },
// ];
// const initialTodos = [
//   {
//     id: 1,
//     title: "Learn React",
//     listNum: 1,
//     Seq: 0,
//   },
//   {
//     id: 2,
//     title: "Learn Node.js",
//     listNum: 1,
//     Seq: 1,
//   },
//   {
//     id: 3,
//     title: "Learn React33",
//     listNum: 2,
//     Seq: 2,
//   },
// ];

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

interface AddTodoList {
  title: string;
  listNum: number;
  Seq: number;
}

export const handlers = [
  // mock login
  rest.post("http://localhost:3000/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Login successful" }));
  }),

  // mock todolists indexed DB data
  rest.get("http://localhost:3000/todoLists", async (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page")) || 1;
    const limit = Number(req.url.searchParams.get("limit")) || 5;
    const todos = await db.todos
      .orderBy("Seq")
      .offset((page - 1) * limit)
      .limit(limit)
      .toArray();
    const lists = await db.lists
      .orderBy("Seq")
      .offset((page - 1) * limit)
      .limit(limit)
      .toArray();

    return res(
      ctx.status(200),
      ctx.json({
        todos: todos,
        lists: lists,
        page: Number(page),
        totalPage: 4,
      }),
    );
  }),

  // mock create todo item data
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

  // mock create list item data
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
          await db.todos.update(todos[index].id, {
            Seq: index,
            listNum: todos[index].listNum,
          });
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

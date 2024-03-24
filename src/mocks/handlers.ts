// import
import { rest } from "msw"; // msw 1.0v 기준
const initialLists = [
  {
    id: 1, //Unique Key
    title: "first", //리스트 이름
    listNum: 1, // List ID
  },
  {
    id: 2,
    title: "second",
    listNum: 2,
  },
  {
    id: 3,
    title: "third",
    listNum: 3,
  },
];
const initialTodos = [
  {
    id: 1,
    title: "Learn React",
    listNum: 1,
  },
  {
    id: 2,
    title: "Learn Node.js",
    listNum: 1,
  },
  {
    id: 3,
    title: "Learn React33",
    listNum: 2,
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

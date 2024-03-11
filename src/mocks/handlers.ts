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

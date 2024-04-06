// import
import { rest } from "msw"; // msw 1.0v 기준
import db from "@/db/db.model";
import { TodoListProps } from "TodoListDragAndDrop";
import { AddTodoList } from "AddButton";

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
      .orderBy("seq")
      .offset((page - 1) * limit)
      .limit(limit)
      .toArray();
    const lists = await db.lists
      .orderBy("seq")
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
      const { title, listId } = req.body;
      const id = await db.lists.add({ title });
      await db.todos.add({ title, listId, seq: id });

      const todos = await db.todos.orderBy("seq").toArray();
      return res(ctx.status(200), ctx.json({ todos: todos }));
    },
  ),

  // mock create list item data
  rest.post<AddTodoList>(
    "http://localhost:3000/list",
    async (req, res, ctx) => {
      const { title } = req.body;
      const id = await db.lists.add({ title });
      await db.lists.update(id, { listId: id, seq: id });

      const lists = await db.lists.orderBy("seq").toArray();
      return res(ctx.status(200), ctx.json({ lists }));
    },
  ),

  rest.post<TodoListProps>(
    "http://localhost:3000/todoList",
    async (req, res, ctx) => {
      const { todos, lists } = req.body;
      if (lists.length) {
        for (let index = 0; index < lists.length; index++) {
          await db.lists.update(lists[index].id, { seq: index });
        }
      }

      if (todos.length) {
        for (let index = 0; index < todos.length; index++) {
          await db.todos.update(todos[index].id, {
            seq: index,
            listId: todos[index].listId,
          });
        }
      }

      const listsUpdate = await db.lists.orderBy("seq").toArray();
      const todosUpdate = await db.todos.orderBy("seq").toArray();
      return res(
        ctx.status(200),
        ctx.json({ todos: todosUpdate, lists: listsUpdate }),
      );
    },
  ),
];

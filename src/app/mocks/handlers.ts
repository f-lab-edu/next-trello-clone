// import
import { rest } from "msw"; // msw 1.0v 기준

// component/export
export const handlers = [
  rest.post("http://localhost:3000/login", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Login successful" }));
  }),
];

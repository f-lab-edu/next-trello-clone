import { setupServer } from "msw/node";
import { handlers, todoHandlers } from "./handlers";

export const server = setupServer(...handlers, ...todoHandlers);

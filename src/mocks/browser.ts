import { setupWorker } from "msw";
import { handlers, todoHandlers } from "./handlers";

export const worker = setupWorker(...handlers, ...todoHandlers);

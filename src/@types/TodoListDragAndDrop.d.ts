/* src/@types/TodoListDragAndDrop.d.ts */

declare module "TodoListDragAndDrop" {
  interface todoParams {
    id: number;
    title: string;
    listNum: number;
    Seq: number;
  }

  interface listParams {
    id: number;
    title: string;
    listNum: number;
    Seq: number;
  }

  interface TodoListParams {
    todos: todoParams[];
    lists: listParams[];
  }

  interface DragAndDropParams {
    todoListData: TodoListParams;
    children?: ReactNode;
  }

  interface TodoContainerParams {
    draggingTodoId: number | null;
    todoId: number;
  }
}

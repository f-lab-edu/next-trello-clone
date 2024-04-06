/* src/@types/TodoListDragAndDrop.d.ts */

declare module "TodoListDragAndDrop" {
  interface todoParams {
    id: number;
    title: string;
    listId: number;
    Seq: number;
  }

  interface listParams {
    id: number;
    title: string;
    listId: number;
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

declare module "AddButton" {
  interface AddButtonParams {
    addData: string | number;
    children: string;
    handleClickConfirm: (params?: string) => void;
    onChange: (params: string) => void;
  }

  interface AddTodoList {
    title: string;
    listId: number;
    Seq: number;
  }

  interface AddTodoParams {
    title: string;
    listId?: number;
  }
}

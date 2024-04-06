/* src/@types/TodoListDragAndDrop.d.ts */
declare module "TodoListDragAndDrop" {
  interface Todo {
    id: number;
    title: string;
    listId: number;
    Seq: number;
  }

  interface List {
    id: number;
    title: string;
    listId: number;
    Seq: number;
  }

  interface TodoListProps {
    todos: Todo[];
    lists: List[];
  }

  interface DragAndDropProps {
    todoListData: TodoListProps;
    children?: ReactNode;
  }

  interface TodoContainerProps {
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

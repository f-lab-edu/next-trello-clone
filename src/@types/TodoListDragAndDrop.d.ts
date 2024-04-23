/* src/@types/TodoListDragAndDrop.d.ts */
declare module "TodoListDragAndDrop" {
  interface Todo {
    id: number;
    title: string;
    listId: number;
    seq: number;
  }

  interface List {
    id: number;
    title: string;
    listId: number;
    seq: number;
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

declare module "DataSubmitForm" {
  interface AddButtonParams {
    data: string | number;
    children: string;
    onConfirm: (params?: string) => void;
    onChange: (params: string) => void;
  }

  interface AddTodoList {
    title: string;
    listId: number;
    seq: number;
  }

  interface AddTodoParams {
    title: string;
    listId?: number;
  }
}

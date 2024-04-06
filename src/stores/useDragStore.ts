// Zustand 기본 사용 구조
import { create } from "zustand";
import { Todo, listParams } from "TodoListDragAndDrop";

const initialLists: listParams[] | null = [];
const initialTodos: Todo[] | null = [];

// 타입 지정
interface State {
  todos: Todo[];
  lists: listParams[];
  backupTodos: Todo[];
  backupLists: listParams[];
  setTodos: (props: Todo[]) => void;
  setLists: (
    props: listParams[],
  ) => void | React.Dispatch<React.SetStateAction<listParams[]>>;
  filterTodo: (filterValue: string) => void;
}

// 스테이트 동작 생성
export const useDragStore = create<State>((set) => ({
  todos: initialTodos,
  lists: initialLists,
  backupTodos: initialTodos,
  backupLists: initialLists,
  setTodos: (props) => set({ todos: props, backupTodos: props }),
  setLists: (props) => set({ lists: props, backupLists: props }),

  filterTodo: (filterValue) =>
    set((state) => {
      const filteredTodos = state.backupTodos.filter((todo: Todo) => {
        return todo.title.includes(filterValue);
      });

      return {
        todos: filteredTodos,
      };
    }),
}));

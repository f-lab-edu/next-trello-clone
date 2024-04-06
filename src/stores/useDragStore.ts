// Zustand 기본 사용 구조
import { create } from "zustand";
import { todoParams, listParams } from "TodoListDragAndDrop";

const initialLists: listParams[] | null = [];
const initialTodos: todoParams[] | null = [];

// 타입 지정
interface State {
  todos: todoParams[];
  lists: listParams[];
  backupTodos: todoParams[];
  backupLists: listParams[];
  setTodos: (props: todoParams[]) => void;
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
      const filteredTodos = state.backupTodos.filter((todo: todoParams) => {
        return todo.title.includes(filterValue);
      });

      return {
        todos: filteredTodos,
      };
    }),
}));

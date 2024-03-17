// Zustand 기본 사용 구조
import { create } from "zustand";

interface DataValues {
  id: number;
  title: string;
  listNum: number;
  Seq?: number;
}

const initialLists: DataValues[] | null = [];
const initialTodos: DataValues[] | null = [];

// 타입 지정
interface State {
  todos: DataValues[];
  lists: DataValues[];
  backupTodos: DataValues[];
  backupLists: DataValues[];
  setTodos: (props: DataValues[]) => void;
  setLists: (props: DataValues[]) => void;
  addList: (name: string) => void;
  addTodo: (title: string, listNum: number) => void;
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

  addList: (name) =>
    set((state) => {
      const newId = state.lists.length + 1;
      return {
        lists: [...state.lists, { id: newId, title: name, listNum: newId }],
        backupLists: [
          ...state.lists,
          { id: newId, title: name, listNum: newId },
        ],
      };
    }),

  addTodo: (title, listNum) =>
    set((state) => {
      const newId = state.todos.length + 1;
      return {
        todos: [...state.todos, { id: newId, title: title, listNum: listNum }],
        backupTodos: [
          ...state.todos,
          { id: newId, title: title, listNum: listNum },
        ],
      };
    }),

  filterTodo: (filterValue) =>
    set((state) => {
      const filteredTodos = state.backupTodos.filter((todo: DataValues) => {
        return todo.title.includes(filterValue);
      });

      return {
        todos: filteredTodos,
      };
    }),
}));

// Zustand 기본 사용 구조
import { create } from "zustand";

interface DataValues {
  id: number;
  title: string;
  listNum: number;
  Seq: number;
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
  setLists: (
    props: DataValues[],
  ) => void | React.Dispatch<React.SetStateAction<DataValues[]>>;
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
      const filteredTodos = state.backupTodos.filter((todo: DataValues) => {
        return todo.title.includes(filterValue);
      });

      return {
        todos: filteredTodos,
      };
    }),
}));

// Zustand 기본 사용 구조
import { create } from "zustand";
import { Todo, List } from "TodoListDragAndDrop";

const initialLists: List[] | null = [];
const initialTodos: Todo[] | null = [];

// 타입 지정
interface State {
  todos: Todo[];
  lists: List[];
  backupTodos: Todo[];
  backupLists: List[];
  setTodos: (props: Todo[]) => void;
  setLists: (
    props: List[],
  ) => void | React.Dispatch<React.SetStateAction<List[]>>;
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

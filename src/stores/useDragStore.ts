// Zustand 기본 사용 구조
import { create } from "zustand";

interface Todo {
  id: number;
  text: string;
  list: number;
}

interface List {
  id: number;
  listName: string;
  todoList: number;
}

const initialLists: List[] | null = [];
const initialTodos: Todo[] | null = [];

// 타입 지정
interface State {
  todos: Todo[];
  lists: List[];
  backupTodos: Todo[];
  backupLists: List[];
  setTodos: (props: Todo[]) => void;
  setLists: (props: List[]) => void;
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
        lists: [...state.lists, { id: newId, listName: name, todoList: newId }],
        backupLists: [
          ...state.lists,
          { id: newId, listName: name, todoList: newId },
        ],
      };
    }),

  addTodo: (title, listNum) =>
    set((state) => {
      const newId = state.todos.length + 1;
      return {
        todos: [...state.todos, { id: newId, text: title, list: listNum }],
        backupTodos: [
          ...state.todos,
          { id: newId, text: title, list: listNum },
        ],
      };
    }),

  filterTodo: (filterValue) =>
    set((state) => {
      const filteredTodos = state.backupTodos.filter((todo: Todo) => {
        console.log("todotext", todo.text);
        return todo.text.includes(filterValue);
      });
      console.log("filteredTodos", filteredTodos);
      return {
        todos: filteredTodos,
      };
    }),
}));

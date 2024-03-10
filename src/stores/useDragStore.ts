// Zustand 기본 사용 구조
import { create } from "zustand";

interface Todo {
  id: number;
  text: string;
  list: number;
}

interface List {
  id: number;
  listSeq: number;
  listName: string;
  todoList: number;
}

// 임시 데이터
const initialLists: List[] = [
  {
    id: 1,
    listSeq: 1, // todo 리스트 순서
    listName: "first", //리스트 이름
    todoList: 1, //
  },
  {
    id: 2,
    listSeq: 2,
    listName: "second",
    todoList: 2,
  },
  {
    id: 3,
    listSeq: 3,
    listName: "third",
    todoList: 3,
  },
];

const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Learn React",
    list: 1,
  },
  {
    id: 2,
    text: "Learn Node.js",
    list: 1,
  },
  {
    id: 3,
    text: "Learn React33",
    list: 2,
  },
];

// 타입 지정
interface State {
  todos: Todo[];
  lists: List[];
  setTodos: (props: Todo[]) => void;
  setLists: (props: List[]) => void;
  addList: (name: string) => void;
  addTodo: (title: string, listNum: number) => void;
}

// 스테이트 동작 생성
export const useDragStore = create<State>((set) => ({
  todos: initialTodos,
  lists: initialLists,
  setTodos: (props) => set({ todos: props }),
  setLists: (props) => set({ lists: props }),
  addList: (name) =>
    set((state) => {
      const newId = state.lists.length + 1;
      return {
        lists: [
          ...state.lists,
          { id: newId, listSeq: newId, listName: name, todoList: newId },
        ],
      };
    }),
  addTodo: (title, listNum) =>
    set((state) => {
      const newId = state.todos.length + 1;
      return {
        todos: [...state.todos, { id: newId, text: title, list: listNum }],
      };
    }),
}));

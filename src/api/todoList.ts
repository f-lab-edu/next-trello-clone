import axios from "axios";
import { useMutation, useInfiniteQuery } from "react-query";
import { useDragStore } from "@/stores/useDragStore";

interface DataValues {
  id: number;
  title: string;
  listNum: number;
  Seq?: number;
}

interface TodoListValue {
  pageParam: number;
}
interface AddTodoProps {
  title: string;
  listNum?: number;
}

interface UpdateTodoListProps {
  todos: DataValues[];
  lists: DataValues[];
}

export const useTodoListInfiniteQuery = () =>
  useInfiniteQuery(
    ["page"],
    async ({ pageParam = 1 }) => {
      const response = await axios.get(`/todoLists?page=${pageParam}&limit=5`);
      return response.data;
    },
    {
      getNextPageParam: (lastPage, allPosts) => {
        return lastPage.page !== allPosts[0].totalPage
          ? lastPage.page + 1
          : undefined;
      },
      enabled: false,
    },
  );

export const useAddTodoMutation = () => {
  const { setTodos } = useDragStore();
  const AddMutation = useMutation(
    async ({ title, listNum }: AddTodoProps) => {
      const response = await axios.post("/createTodo", { title, listNum });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("success", data.todos);
        setTodos(data.todos);
      },
    },
  );
  return AddMutation;
};

export const useAddListMutation = () => {
  const { setLists } = useDragStore();
  const AddListMutation = useMutation(
    async ({ title }: AddTodoProps) => {
      const response = await axios.post("/addList", { title });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("success", data.lists);
        setLists(data.lists);
      },
    },
  );
  return AddListMutation;
};

export const useUpdateTodoListMutation = () => {
  const AddListMutation = useMutation(
    async ({ todos, lists }: UpdateTodoListProps) => {
      if (lists.length) {
        for (let index = 0; index < lists.length; index++) {
          lists[index] = {
            ...lists[index],
            Seq: index,
          };
        }
      }

      if (todos.length) {
        for (let index = 0; index < todos.length; index++) {
          todos[index] = {
            ...todos[index],
            Seq: index,
          };
        }
      }

      const response = await axios.post("/editTodoList", {
        todos,
        lists,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("update success", data.lists, data.todos);
      },
    },
  );
  return AddListMutation;
};

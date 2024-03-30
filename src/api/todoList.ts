import axios from "axios";
import { useMutation, useInfiniteQuery, useQueryClient } from "react-query";
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

const TodoListDataAPI = async ({ pageParam = 1 }) => {
  const response = await axios.get(`/todoLists?page=${pageParam}&limit=5`);
  return response.data;
};
export const useTodoListInfiniteQuery = () =>
  useInfiniteQuery({
    queryFn: TodoListDataAPI,
    queryKey: ["infiniteScroll"],
    staleTime: Infinity,
    getNextPageParam: (lastPage, allPosts) => {
      return lastPage.page !== allPosts[0].totalPage
        ? lastPage.page + 1
        : undefined;
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

export const useCreateTodoMutation = () => {
  const { setTodos } = useDragStore();
  const queryClient = useQueryClient();
  const AddMutation = useMutation(
    async ({ title, listNum }: AddTodoProps) => {
      const response = await axios.post("/todo", { title, listNum });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("success", data.todos);
        queryClient.invalidateQueries("infiniteScroll");
        setTodos(data.todos);
      },
    },
  );
  return AddMutation;
};

export const useCreateListMutation = () => {
  const queryClient = useQueryClient();
  const { setLists } = useDragStore();
  const AddListMutation = useMutation(
    async ({ title }: AddTodoProps) => {
      const response = await axios.post("/list", { title });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("success lists", data.lists);
        queryClient.invalidateQueries("infiniteScroll");
        setLists(data.lists);
      },
    },
  );
  return AddListMutation;
};

export const useEditTodoListMutation = () => {
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

      const response = await axios.post("/todoList", {
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

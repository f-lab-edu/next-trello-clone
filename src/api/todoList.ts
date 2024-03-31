import axios from "axios";
import { useMutation, useInfiniteQuery, useQueryClient } from "react-query";
import { TodoListParams } from "TodoListDragAndDrop";
import { AddTodoParams } from "AddButton";

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
  const queryClient = useQueryClient();
  const AddMutation = useMutation(
    async ({ title, listNum }: AddTodoParams) => {
      const response = await axios.post("/todo", { title, listNum });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("success", data.todos);
        queryClient.invalidateQueries("infiniteScroll");
      },
    },
  );
  return AddMutation;
};

export const useCreateListMutation = () => {
  const queryClient = useQueryClient();

  const AddListMutation = useMutation(
    async ({ title }: AddTodoParams) => {
      const response = await axios.post("/list", { title });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("success lists", data.lists);
        queryClient.invalidateQueries("infiniteScroll");
      },
    },
  );
  return AddListMutation;
};

export const useEditTodoListMutation = () => {
  const queryClient = useQueryClient();
  const AddListMutation = useMutation(
    async ({ todos, lists }: TodoListParams) => {
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
            listNum: todos[index].listNum,
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
        queryClient.invalidateQueries("infiniteScroll");
      },
    },
  );
  return AddListMutation;
};

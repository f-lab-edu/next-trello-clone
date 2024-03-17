import axios from "axios";
import { useMutation } from "react-query";
import { useDragStore } from "@/stores/useDragStore";

interface DataValues {
  id: number;
  title: string;
  listNum: number;
  Seq?: number;
}

interface AddTodoProps {
  title: string;
  listNum?: number;
}

interface UpdateTodoListProps {
  todos: DataValues[];
  lists: DataValues[];
}

const todoList = async () => {
  const response = await axios.get("/todoLists");
  return response.data;
};

const todoFilter = async (nextValue: string) => {
  const response = await axios.post("/todoFilter", { filter: nextValue });
  return response.data;
};

export const useAddTodoMutation = () => {
  const { setTodos } = useDragStore();
  const AddMutation = useMutation(
    async ({ title, listNum }: AddTodoProps) => {
      const response = await axios.post("/addTodo", { title, listNum });
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
      for (let index = 0; index < lists.length; index++) {
        lists[index] = {
          ...lists[index],
          Seq: index,
        };
      }

      for (let index = 0; index < todos.length; index++) {
        todos[index] = {
          ...todos[index],
          Seq: index,
        };
      }

      const response = await axios.post("/updateTodoList", {
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
export { todoList, todoFilter };

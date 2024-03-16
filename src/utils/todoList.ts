import axios from "axios";

const todoList = async () => {
  const response = await axios.get("/todoLists");
  return response.data;
};

const todoFilter = async (nextValue: string) => {
  const response = await axios.post("/todoFilter", { filter: nextValue });
  return response.data;
};

export { todoList, todoFilter };

import axios from "axios";

const todoList = async () => {
  try {
    const response = await axios.get("/todoLists");
    return response.data;
  } catch (error) {
    throw new Error("List Get failed");
  }
};

const todoFilter = async (nextValue: string) => {
  try {
    const response = await axios.post("/todoFilter", { filter: nextValue });
    return response.data;
  } catch (error) {
    throw new Error("List Get failed");
  }
};

export { todoList, todoFilter };

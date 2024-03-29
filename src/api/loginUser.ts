// react-query를 위한 login API
import axios from "axios";

const loginUser = async (data: { id: string; password: string }) => {
  const response = await axios.post("/login", data);
  return response.data;
};

export { loginUser };

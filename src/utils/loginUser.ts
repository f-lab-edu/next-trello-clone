// react-query를 위한 login API
import axios from "axios";

const loginUser = async (data: { id: string; password: string }) => {
  try {
    const response = await axios.post("/login", data);

    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export { loginUser };

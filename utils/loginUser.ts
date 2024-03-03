// react-query를 위한 login API
const loginUser = async (data: { id: string; password: string }) => {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const responseData = await response.json();
  return responseData;
};

export { loginUser };

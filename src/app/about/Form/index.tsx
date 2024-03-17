"use client";

import { useForm, SubmitHandler } from "react-hook-form"; // 폼 생성을 위한 import
import { TextField, Button, CircularProgress, Alert } from "@mui/material"; // MUI 라이브러리
import { useMutation } from "react-query";
import { loginUser } from "@/api/loginUser";

interface LoginFormValues {
  id: string;
  password: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log(data);
    },
  }); // POST API일 경우 useMutation

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    /* "handleSubmit"이 onSubmit 동작 되기 전에 inputs을 식별 */
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        defaultValue=""
        {...register("id")}
        variant="outlined"
        label="ID"
        fullWidth
        margin="normal"
      />

      {/* 추가적인 제약조건 지정 (반드시 데이터를 입력해야 하는 폼) */}
      <TextField
        {...register("password", { required: true })}
        variant="outlined"
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={Boolean(errors.password)}
        helperText={errors.password && "This field is required"}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
      </Button>

      {loginMutation.isError && (
        <Alert severity="error">An error occurred</Alert>
      )}

      {loginMutation.isSuccess && (
        <Alert severity="success">Login successful!</Alert>
      )}
    </form>
  );
};

export default Form;

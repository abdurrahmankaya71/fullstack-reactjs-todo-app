import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { LOGIN_FORM } from "../data";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IErrorResponse, ILoginInput } from "../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import axiosInstance from "../config/axios.config";

const Login = () => {
  //! states
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({ resolver: yupResolver(loginSchema) });

  //! Handlers
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    console.log(data);
    //!  1- Pending
    setIsLoading(true);
    try {
      //! 2- Fulfilled => Success => optional
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      console.log(resData);
      if (status === 200) {
        toast.success(
          "Sec You will navigate to the home page after 3 seconds.",
          {
            position: "bottom-center",
            duration: 1500,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        setTimeout(() => {
          location.replace("/");
        }, 1000);
      }
      console.log(status);
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data?.error?.message}`, {
        position: "bottom-center",
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });

      //! 3- Rejected => Failed => optional
    } finally {
      setIsLoading(false);
    }
  };

  //! Renders
  const renderRegisterForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md space-y-4 mt-4 mx-auto">
      <h2 className="font-bold text-2xl text-center">Login to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

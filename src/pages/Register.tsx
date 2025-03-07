import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { IRegisterInput } from "../interfaces/index";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>({ resolver: yupResolver(registerSchema) });

  //! Handlers
  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    console.log(data);
    //!  1- Pending
    setIsLoading(true);
    try {
      //! 2- Fulfilled => Success => optional
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status === 200) {
        toast.success(
          "You will navigate to the login page after 3 seconds to login.",
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
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      console.log(status);
    } catch (error) {
      //! 3- Rejected => Failed => optional
    } finally {
      setIsLoading(false);
    }
  };

  //! Renders
  const renderRegisterForm = REGISTER_FORM.map(
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
      <h2 className="font-bold text-2xl text-center">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          Register
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default RegisterPage;

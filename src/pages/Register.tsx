import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { IRegisterInput } from "../interfaces/index";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>({ resolver: yupResolver(registerSchema) });

  //! Handlers
  const onSubmit: SubmitHandler<IRegisterInput> = (data) => {
    console.log(data);

    /**
     * 1- Pending
     * 2- Fulfilled => Success => optional
     * 3- Rejected => Failed => optional
     **
     */
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
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;

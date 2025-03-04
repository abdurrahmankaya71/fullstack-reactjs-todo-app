import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRegisterInput } from "../interfaces/index";
import Button from "./../components/ui/Button";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<IRegisterInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-4">
      <h2 className="font-bold text-2xl">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Username" {...register("username")} />
        <Input placeholder="Email Address" {...register("email")} />
        <Input placeholder="Password" {...register("password")} />
        <Button fullWidth>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;

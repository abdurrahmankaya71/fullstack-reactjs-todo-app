import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-4">
      <h2 className="font-bold text-2xl">Login to get access!</h2>
      <form className="space-y-4">
        <Input placeholder="Email Address" />
        <Input placeholder="Password" />
        <Button fullWidth>Login</Button>
      </form>
    </div>
  );
};

export default Login;

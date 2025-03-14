import axiosInstance from "../config/axios.config";
import ErrorHandler from "./errors/ErrorHandler";
import Button from "./ui/Button";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/users/me?populate=todos", {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      return data;
    },
  });

  // const uniqeTodos = Array.from(
  //   new Map(data.todos.map((todo) => [todo.documentId, todo]).values())
  // );

  if (isPending) return <h3>'Loading...'</h3>;

  if (error) return <ErrorHandler />;

  // console.log({ isPending, error, data });

  return (
    <div className="my-10">
      {data.todos.map((todo) => (
        <div
          className="flex items-center justify-between hover:bg-gray-100 duration-300 rounded-md p-2"
          key={todo.id}
        >
          <p className="w-full font-semibold">{todo.title}</p>
          <div className="flex items-center justify-end w-full space-x-3">
            <Button size={"sm"}>Edit</Button>
            <Button variant={"danger"} size={"sm"}>
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;

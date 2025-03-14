import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import ErrorHandler from "./errors/ErrorHandler";
import Button from "./ui/Button";

const TodoList = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { data, isPending, error } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: { Authorization: `Bearer ${userData.jwt}` },
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
      {data.todos.length ? (
        data.todos.map((todo: any) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 hover:cursor-pointer duration-300 rounded-md p-2 even:bg-gray-100"
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
        ))
      ) : (
        <h3 className="text-center text-2xl font-semibold">No todos yet</h3>
      )}
    </div>
  );
};

export default TodoList;

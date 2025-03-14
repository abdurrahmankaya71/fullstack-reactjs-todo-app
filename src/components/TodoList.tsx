import { useState } from "react";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import ErrorHandler from "./errors/ErrorHandler";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";

const TodoList = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  //! States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isPending, error } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    },
  });

  //! Handlers
  const onToggleEditModal = () => {
    setIsEditModalOpen((prev) => !prev);
  };

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
              <Button size={"sm"} onClick={onToggleEditModal}>
                Edit
              </Button>
              <Button variant={"danger"} size={"sm"}>
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3 className="text-center text-2xl font-semibold">No todos yet</h3>
      )}
      {/* Edit todo modal */}
      <Modal
        isOpen={isEditModalOpen}
        closeModal={onToggleEditModal}
        title="Edit this todo"
      >
        <Input value={"Edit todo"} />
        <div className="flex items-center gap-2 mt-4">
          <Button size={"sm"}>Update</Button>
          <Button variant={"cancel"} size={"sm"}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;

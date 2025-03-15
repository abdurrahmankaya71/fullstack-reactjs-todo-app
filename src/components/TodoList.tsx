import { ChangeEvent, FormEvent, useState } from "react";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import ErrorHandler from "./errors/ErrorHandler";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";

const TodoList = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  //! States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [todoToEdit, settodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
    documentId: "",
  });

  //! Handlers
  const onCloseEditModal = () => setIsEditModalOpen(false);

  const onOpenEditModal = (todo: ITodo) => {
    settodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    settodoToEdit({ ...todoToEdit, [name]: value });
    console.log(value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, documentId } = todoToEdit;
    try {
      await axiosInstance.put(
        `/todos/${documentId}`,
        {
          data: { title, description },
        },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        }
      );
      toast.success("Todo updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    onCloseEditModal();
  };

  const { data, isPending, error } = useAuthenticatedQuery({
    queryKey: ["todos"],
    url: "/users/me?populate=todos",
    config: {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    },
  });
  if (isPending) return <h3>'Loading...'</h3>;
  if (error) return <ErrorHandler />;
  // console.log({ isPending, error, data });

  return (
    <div className="my-10">
      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            className="flex items-center justify-between hover:bg-gray-100 hover:cursor-pointer duration-300 rounded-md p-2 even:bg-gray-100"
            key={todo.id}
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={() => onOpenEditModal(todo)}>
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
        closeModal={onCloseEditModal}
        title="Edit this todo"
      >
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <Input
            name="title"
            value={todoToEdit.title}
            onChange={onChangeHandler}
          />
          <Textarea
            name="description"
            value={todoToEdit.description}
            onChange={onChangeHandler}
          />
          <div className="flex items-center gap-2 mt-4">
            <Button size={"sm"}>Update</Button>
            <Button variant={"cancel"} size={"sm"} onClick={onCloseEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TodoList;

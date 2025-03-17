import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorHandler from "./errors/ErrorHandler";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import Textarea from "./ui/Textarea";
import { ITodo } from "../interfaces";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import useGetAuthenticatedQuery from "../hooks/useGetAuthenticatedQuery";

const TodoList = () => {
  const userDataString = localStorage.getItem("loggedInUser");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const queryClient = useQueryClient();

  //! States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [todoToEdit, settodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
    documentId: "",
  });
  const [todoToDelete, setTodoToDelete] = useState<ITodo | null>(null);

  //! Handlers
  const onCloseEditModal = () => setIsEditModalOpen(false);

  const closeConfirmModal = () => setIsOpenConfirmModal(false);

  const onOpenEditModal = (todo: ITodo) => {
    settodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const onOpenRemoveModal = (todo: ITodo) => {
    setTodoToDelete(todo);
    setIsOpenConfirmModal(true);
  };

  const deleteTodoMutation = useMutation({
    mutationFn: async (todo: ITodo) => {
      return axiosInstance.delete(`/todos/${todo.documentId}`, {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
      toast.success("Todo removed successfully");
      closeConfirmModal();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onRemove = () => {
    if (todoToDelete) {
      deleteTodoMutation.mutate(todoToDelete);
    }
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    settodoToEdit({ ...todoToEdit, [name]: value });
    // console.log(value);
  };

  const { data, isPending, error } = useGetAuthenticatedQuery({
    queryKey: ["todoList"],
    url: "/users/me?populate=todos",
    config: {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo: ITodo) => {
      const { title, description, documentId } = updatedTodo;
      return axiosInstance.put(
        `/todos/${documentId}`,
        {
          data: { title, description },
        },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todoList"] });
      toast.success("Todo updated successfully");
      onCloseEditModal();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodoMutation.mutate(todoToEdit);
  };

  if (isPending) return <h3>'Loading...'</h3>;
  if (error) return <ErrorHandler />;

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
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => onOpenRemoveModal(todo)}
              >
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
            <Button size={"sm"} isLoading={updateTodoMutation.isPending}>
              Update
            </Button>
            <Button variant={"cancel"} size={"sm"} onClick={onCloseEditModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Delete todo Modal */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this todo from your store ?"
        description="Deleting this todo will remove it permenantly from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3 mt-4">
          <Button
            variant="danger"
            onClick={onRemove}
            isLoading={deleteTodoMutation.isPending}
          >
            Yes, Remove
          </Button>
          <Button variant="cancel" type="button" onClick={closeConfirmModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;

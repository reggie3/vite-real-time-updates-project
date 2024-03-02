import { QueryKey } from "../queryKeys";
import { Todo } from "@/schema";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (todo: Todo) => {
      return fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate the todos query
      queryClient.invalidateQueries({ queryKey: [QueryKey.Todo] });
    },
  });

  return response;
};

export default useAddTodo;

import restClient from "../restClient";
import { QueryKey } from "../queryKeys";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Todo } from "../schema";

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (todo: Todo) => {
      // @ts-expect-error Type 'Todo' has no properties in common with type
      const res = await restClient.todos.post(todo);
      if (res.error) throw new Error(res.error.message);

      return res.data;
    },
    onSuccess: () => {
      // Invalidate the todos query
      queryClient.invalidateQueries({ queryKey: [QueryKey.Todo] });
    },
  });

  return response;
};

export default useAddTodo;

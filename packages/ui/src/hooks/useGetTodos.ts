import restClient from "../restClient";
import { QueryKey } from "../queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Todo } from "../schema";

const useGetTodos = () => {
  const query = useQuery({
    queryKey: [QueryKey.Todo],
    queryFn: async (): Promise<Todo[]> => {
      const res = await restClient.todos.get();

      if (res.error) throw new Error(res.error.message);

      return res.data;
    },
  });

  return query;
};

export default useGetTodos;

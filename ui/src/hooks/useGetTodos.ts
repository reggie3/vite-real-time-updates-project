import restClient from "../restClient";
import { QueryKey } from "../queryKeys";
import { Todo } from "@/schema";
import { useQuery } from "@tanstack/react-query";

const useGetTodos = () => {
  const query = useQuery({
    queryKey: [QueryKey.Todo],
    queryFn: async (): Promise<Todo[]> => {
      const res = await fetch("http://localhost:3000/todos");
      const todos = await res.json();
      console.log({ res, todos });
      return todos;

      // const res = await restClient.todos.get();
      // console.log({ res });
      // if (res.error) throw new Error(res.error.message);

      // return res.data;
    },
  });

  return query;
};

export default useGetTodos;

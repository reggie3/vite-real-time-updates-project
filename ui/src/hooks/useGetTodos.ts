import { Todo } from "@/schema";
import { useQuery } from "@tanstack/react-query";

const useGetTodos = () => {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async (): Promise<Todo[]> => {
      const res = await fetch("http://localhost:3000/todos");

      const json = await res.json();
      return json.todos;
    },
  });

  return query;
};

export default useGetTodos;

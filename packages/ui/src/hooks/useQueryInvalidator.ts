import { useQueryClient } from "@tanstack/react-query";

const useQueryInvalidator = () => {
  const queryClient = useQueryClient();

  const invaldiateQuery = (tableName: string) => {
    queryClient.invalidateQueries({
      queryKey: [tableName],
      exact: true,
    });
  };

  return invaldiateQuery;
};

export default useQueryInvalidator;

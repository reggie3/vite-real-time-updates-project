import restClient from "../restClient";
import { QueryKey } from "../queryKeys";
import { useQuery } from "@tanstack/react-query";

const useLogin = () => {
  const query = useQuery({
    queryKey: [QueryKey.Login],
    queryFn: async (): Promise<{ username: string }> => {
      const res = await restClient.login.get();
      console.log({ res });
      if (res.error) throw new Error(res.error.message);

      return res.data;
    },
  });

  return query;
};

export default useLogin;

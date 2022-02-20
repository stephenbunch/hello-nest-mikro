import axios from "axios";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiClientProvider, createApiClient } from "./api-client";
import { TodoApp } from "./TodoApp";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [axiosClient] = useState(() => axios.create());
  const [apiClient] = useState(() => createApiClient(axiosClient));

  return (
    <ApiClientProvider client={apiClient}>
      <QueryClientProvider client={queryClient}>
        <TodoApp />
      </QueryClientProvider>
    </ApiClientProvider>
  );
}

export default App;

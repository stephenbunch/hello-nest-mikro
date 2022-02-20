import { AxiosInstance } from "axios";
import { createContext, ReactNode, useContext } from "react";
import { Configuration, DefaultApi } from "./api";

const ApiClientContext = createContext<DefaultApi | null>(null);

export interface ApiClientProviderProps {
  client: DefaultApi;
  children: ReactNode[] | ReactNode;
}

export function ApiClientProvider(props: ApiClientProviderProps) {
  const { client, children } = props;
  return (
    <ApiClientContext.Provider value={client}>
      {children}
    </ApiClientContext.Provider>
  );
}

export function useApiClient() {
  const client = useContext(ApiClientContext);
  if (!client) {
    throw new Error(
      "Could not find GraphQL client. " +
        "Make sure to wrap the root component with GraphQLProvider."
    );
  }
  return client;
}

function bindMembersToSelf<T extends object>(object: T): T {
  const proxy = new Proxy(object, {
    get(target: any, prop, receiver) {
      if (typeof target[prop] === "function") {
        return target[prop].bind(target);
      }
      return target[prop];
    },
  });
  return proxy;
}

export function createApiClient(axios: AxiosInstance) {
  return bindMembersToSelf(
    new DefaultApi(
      new Configuration({ basePath: `//${window.location.host}` }),
      undefined,
      axios
    )
  );
}

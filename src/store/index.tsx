import { createContext, ReactChild, useContext } from "react";
import Store from "./store";

export const Context = createContext({
  store: new Store(),
});

export function useStore() {
  const { store } = useContext(Context);
  return { store };
}

const value = {
  store: new Store(),
};

const ContextProvider = ({
  children,
}: {
  children: ReactChild;
}) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
export default ContextProvider;
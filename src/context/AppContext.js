import { createContext } from "react";

const AppContext = createContext({
  handleClick: () => {},
});

export default AppContext;

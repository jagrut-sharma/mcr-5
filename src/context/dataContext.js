import { createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { dataReducer, initialDataState } from "../reducer/dataReducer";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [dataState, dataDispatch] = useImmerReducer(
    dataReducer,
    initialDataState
  );

  const dataContext = {
    dataState,
    dataDispatch,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

import { createContext, useContext, useEffect, useState } from "react";
import { useImmer, useImmerReducer } from "use-immer";
import { dataReducer, initialDataState } from "../reducer/dataReducer";
import { recipesData } from "../utils/data";
import { ACTIONS } from "../utils/ACTIONS";

const DataContext = createContext({
  dataState: {},
  dataDispatch: () => {},
  recipes: {},
  setRecipes: () => {},
});

export const DataProvider = ({ children }) => {
  const [recipes, setRecipes] = useImmer(() => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : recipesData;
  });
  const [dataState, dataDispatch] = useImmerReducer(
    dataReducer,
    initialDataState
  );

  useEffect(() => {
    dataDispatch({
      type: ACTIONS.INITIALIZE_DATA,
      payload: recipes,
    });
  }, []);

  const dataContext = {
    dataState,
    dataDispatch,
    recipes,
    setRecipes,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

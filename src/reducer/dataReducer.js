import { ACTIONS } from "../utils/ACTIONS";

export const initialDataState = {
  recipesArr: [],
};

export const dataReducer = (draft, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_DATA: {
      draft.recipesArr = action.payload;
      localStorage.setItem("recipes", JSON.stringify(action.payload));
      break;
    }

    case ACTIONS.ADD_RECIPE: {
      draft.recipesArr.push(action.payload);
      break;
    }

    case ACTIONS.UPDATE_LOCAL_STORAGE: {
      const allRecipes = draft.recipesArr;
      localStorage.setItem("recipes", JSON.stringify(allRecipes));
      break;
    }

    case ACTIONS.DELETE_RECIPE: {
      draft.recipesArr = draft.recipesArr.filter(
        (recipe) => recipe._id !== action.payload
      );

      break;
    }

    default:
      break;
  }
};

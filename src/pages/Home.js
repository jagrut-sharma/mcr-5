import React from "react";
import RecipeModal from "../components/RecipeModal";
import { useData } from "../context/dataContext";
import { ACTIONS } from "../utils/ACTIONS";
import { useImmer } from "use-immer";
import PostCard from "../components/PostCard";

const initialFilterData = {
  searchFilter: "",
  searchCategory: "name",
};

export default function Home() {
  const [filter, setFilter] = useImmer(initialFilterData);

  const {
    dataState: { recipesArr },
    dataDispatch,
  } = useData();

  const handleDelete = (e, id) => {
    e.preventDefault();

    dataDispatch({ type: ACTIONS.DELETE_RECIPE, payload: id });
    dataDispatch({ type: ACTIONS.UPDATE_LOCAL_STORAGE });
  };

  const handleChangeCategory = (e) => {
    setFilter((draft) => {
      draft.searchCategory = e.target.value;
    });
  };

  const handleSearch = (e) => {
    setFilter((draft) => {
      draft.searchFilter = e.target.value;
    });
  };

  const sortedRecipe = recipesArr.filter((recipe) => {
    if (filter.searchCategory === "ingredients") {
      const ingreds = recipe.ingredients.join(", ");
      console.log(ingreds);
      return ingreds.toLowerCase().includes(filter.searchFilter.toLowerCase());
    } else {
      return recipe[filter.searchCategory]
        .toLowerCase()
        .includes(filter.searchFilter.toLowerCase());
    }
  });

  return (
    <>
      <h1 className="text-3xl font-bold font-Merriweather bg-gray-100 p-4 shadow-md">
        Recipe Counter
      </h1>

      <div className="m-4 flex items-center">
        <div>
          <label
            htmlFor="search"
            className="text-xl text-gray-500 font-bold mr-1"
          >
            Search
          </label>
          <input
            type="search"
            id="search"
            className="border-2 border-gray-400 rounded-md p-1"
            value={filter.searchFilter}
            onChange={handleSearch}
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xl text-gray-500 font-bold mx-2">Filters:</p>

          <div className="flex gap-2">
            <input
              type="radio"
              name="search-filter"
              className="cursor-pointer"
              id="name"
              value={"name"}
              checked={filter.searchCategory === "name"}
              onChange={handleChangeCategory}
            />
            <label htmlFor="name" className="text-xl cursor-pointer">
              Name
            </label>
          </div>

          <div className="flex gap-2">
            <input
              type="radio"
              name="search-filter"
              id="ingredients"
              value={"ingredients"}
              checked={filter.searchCategory === "ingredients"}
              onChange={handleChangeCategory}
              className="cursor-pointer"
            />
            <label htmlFor="ingredients" className="text-xl cursor-pointer">
              Ingredients
            </label>
          </div>

          <div className="flex gap-2">
            <input
              type="radio"
              name="search-filter"
              id="cuisine"
              value={"cuisine"}
              checked={filter.searchCategory === "cuisine"}
              onChange={handleChangeCategory}
              className="cursor-pointer"
            />
            <label htmlFor="cuisine" className="text-xl cursor-pointer">
              Cuisine
            </label>
          </div>
        </div>
      </div>

      <div className="m-4">
        <p className="text-xl font-Libre font-bold">All Recipes</p>
        <div className="flex gap-8 mt-4 flex-wrap">
          {sortedRecipe.map((recipe) => (
            <PostCard recipe={recipe} key={recipe._id} />
          ))}
        </div>
      </div>

      <RecipeModal />
    </>
  );
}

// name, cuisine type, ingredients, instructions

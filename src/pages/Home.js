import React, { useState } from "react";
import RecipeModal from "../components/RecipeModal";
import { useData } from "../context/dataContext";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { ACTIONS } from "../utils/ACTIONS";
import { useImmer } from "use-immer";
import { AiFillEdit } from "react-icons/ai";
import EditRecipeModal from "../components/EditRecipeModal";

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
    return recipe[filter.searchCategory]
      .toLowerCase()
      .includes(filter.searchFilter.toLowerCase());
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
              id="name"
              value={"name"}
              checked={filter.searchCategory === "name"}
              onChange={handleChangeCategory}
            />
            <label htmlFor="name" className="text-xl">
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
            />
            <label htmlFor="ingredients" className="text-xl">
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
            />
            <label htmlFor="cuisine" className="text-xl">
              Cuisine
            </label>
          </div>
        </div>
      </div>

      <div className="m-4">
        <p className="text-xl font-Libre font-bold">All Recipes</p>
        <div className="flex gap-5 mt-4 flex-wrap">
          {sortedRecipe.map((recipe) => (
            <div key={recipe._id} className="bg-slate-200 p-2 relative">
              <Link to={`/recipe/${recipe._id}`}>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-[12rem] h-[15rem] object-cover"
                />

                <div className="flex flex-col flex-wrap">
                  <p className="font-bold text-lg mt-1">{recipe.name}</p>
                  <p className="text-sm mt-1">
                    <span className="font-bold">Cuisine Type:</span>{" "}
                    {recipe.cuisine}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-bold">Ingredients:</span>{" "}
                    <span className="underline">See Recipe</span>
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-bold">Instructions:</span>{" "}
                    <span className="underline">See Recipe</span>
                  </p>
                </div>
                <button
                  className="absolute top-0 right-0 bg-blue-300 p-2"
                  onClick={(e) => handleDelete(e, recipe._id)}
                >
                  <BsFillTrashFill />
                </button>

                <EditRecipeModal recipeData={recipe} />
                {/* <button className="absolute top-0 left-0 bg-blue-300 p-2">
                  <AiFillEdit />
                </button> */}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <RecipeModal />
    </>
  );
}

// name, cuisine type, ingredients, instructions

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useData } from "../context/dataContext";

export default function SingleRecipePage() {
  const { recipeID } = useParams();
  const {
    dataState: { recipesArr },
  } = useData();

  if (recipesArr.length === 0) {
    return <h1>Loading.....</h1>;
  }

  const selectedRecipe = recipesArr.find(({ _id }) => _id === recipeID);

  return (
    <>
      <Link to={"/"} className="hover:text-blue-700">
        <h1 className="text-3xl font-bold font-Merriweather bg-gray-100 p-4 shadow-md">
          Recipe Counter
        </h1>
      </Link>

      <div className="bg-slate-200 p-2 flex justify-center items-center h-[calc(100vh-68px)] gap-4">
        <div>
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.name}
            className="w-[15rem] h-[20rem] object-cover"
          />
        </div>

        <div className="flex flex-col flex-wrap w-[15rem] h-[20rem] gap-3">
          <p className="font-bold text-3xl">{selectedRecipe.name}</p>
          <p className="text-base mt-1">
            <span className="font-bold">Cuisine Type:</span>{" "}
            {selectedRecipe.cuisine}
          </p>

          <div>
            <p className="text-base mt-1">
              <span className="font-bold">Ingredients:</span>
            </p>
            <p>{selectedRecipe.ingredients}</p>
          </div>

          <div>
            <p className="text-base mt-1">
              <span className="font-bold">Instructions:</span>
            </p>
            <p>{selectedRecipe.instructions}</p>
          </div>
        </div>
      </div>
    </>
  );
}

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
    <div className="grid grid-rows-rootLayout h-screen">
      <h1 className="text-3xl font-bold font-Merriweather bg-gray-100 p-4 shadow-md">
        <Link to={"/"} className="hover:text-blue-700">
          {" "}
          Recipe Counter
        </Link>
      </h1>

      <main className="flex flex-col items-center">
        <h2 className="text-2xl font-Libre text-center mt-8">
          {selectedRecipe.name}
        </h2>

        <div className="w-4/5 flex justify-center my-8 rounded-lg gap-4 bg-slate-100 p-3 shadow-lg">
          <div className="w-[40%]">
            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <div className="w-[60%]">
            <p>
              <span className="font-bold">Cuisine type: </span>
              {selectedRecipe.cuisine}
            </p>
            <p className="mt-2">
              <span className="font-bold">Ingredients: </span>
              {selectedRecipe.ingredients.map((ingred, i) =>
                i + 1 === selectedRecipe.ingredients.length
                  ? `${ingred}`
                  : `${ingred}, `
              )}
            </p>
            <p className="mt-2 font-bold">Instructions:</p>
            {selectedRecipe.instructions.map((step, i) => (
              <p key={i} className="mt-2">{`${i + 1}.) ${step}`}</p>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

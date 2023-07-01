import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import EditRecipeModal from "./EditRecipeModal";
import { Link } from "react-router-dom";
import { ACTIONS } from "../utils/ACTIONS";
import { useData } from "../context/dataContext";

export default function PostCard({ recipe }) {
  const { dataDispatch } = useData();

  const handleDelete = (e, id) => {
    e.preventDefault();

    dataDispatch({ type: ACTIONS.DELETE_RECIPE, payload: id });
    dataDispatch({ type: ACTIONS.UPDATE_LOCAL_STORAGE });
  };

  return (
    <div className="bg-slate-200 p-3 relative w-[14rem]">
      <Link to={`/recipe/${recipe._id}`}>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-[15rem] object-cover rounded-md"
        />

        <div className="flex flex-col flex-wrap">
          <p className="font-bold text-lg mt-1">{recipe.name}</p>
          <p className="text-sm mt-1">
            <span className="font-bold">Cuisine Type:</span> {recipe.cuisine}
          </p>
          <p className="text-sm mt-1">
            <span className="font-bold">Ingredients:</span>{" "}
            <span className="hover:underline">See Recipe</span>
          </p>
          <p className="text-sm mt-1">
            <span className="font-bold">Instructions:</span>{" "}
            <span className="hover:underline">See Recipe</span>
          </p>
        </div>
        <button
          className="absolute top-0 right-0 bg-blue-200 hover:bg-blue-300 p-2"
          onClick={(e) => handleDelete(e, recipe._id)}
        >
          <BsFillTrashFill />
        </button>
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <EditRecipeModal recipeData={recipe} />
        </div>
        {/* <button className="absolute top-0 left-0 bg-blue-300 p-2">
      <AiFillEdit />
    </button> */}
      </Link>
    </div>
  );
}

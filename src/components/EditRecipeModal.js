import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useImmer } from "use-immer";
import { useData } from "../context/dataContext";
import { ACTIONS } from "../utils/ACTIONS";
import { AiFillEdit } from "react-icons/ai";

export default function EditRecipeModal({ recipeData }) {
  const [isOpen, setIsOpen] = useState(false);
  const ingreds = recipeData.ingredients.join(", ");
  const instruct = recipeData.instructions.join("\n");
  const initialData = {
    ...recipeData,
    ingredients: ingreds,
    instructions: instruct,
  };
  const [inputData, setInputData] = useImmer({ ...initialData });

  const { dataDispatch } = useData();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }

  const handleChange = (e) => {
    setInputData((draft) => {
      draft[e.target.name] = e.target.value;
    });
  };

  const editRecipeHandler = (e) => {
    e.preventDefault();
    console.log("edited");
    const ingred = inputData.ingredients.split(", ");
    const instruct = inputData.instructions.split("\n");
    const payloadData = {
      ...inputData,
      ingredients: ingred,
      instructions: instruct,
    };
    dataDispatch({ type: ACTIONS.EDIT_RECIPE, payload: payloadData });
    dataDispatch({ type: ACTIONS.UPDATE_LOCAL_STORAGE });
    closeModal();
  };

  return (
    <>
      <div
        className=" cursor-pointer flex items-center w-max bottom-[2rem] right-[2rem] absolute top-0 left-0 bg-blue-200 hover:bg-blue-300 p-2 h-[2rem]"
        onClick={openModal}
      >
        <button
          className=""
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <AiFillEdit />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit recipe
                  </Dialog.Title>

                  <div className="mt-4 flex flex-col gap-1 ">
                    <label
                      htmlFor="name"
                      className="text-base text-gray-500 font-bold"
                    >
                      Name:{" "}
                    </label>
                    <input
                      type="text"
                      className="border-2 border-gray-400 rounded-md p-1"
                      id="name"
                      name="name"
                      placeholder="Name of recipe"
                      value={inputData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-1 ">
                    <label
                      htmlFor="cuisine"
                      className="text-base text-gray-500 font-bold"
                    >
                      Cuisine:{" "}
                    </label>
                    <input
                      type="text"
                      className="border-2 border-gray-400 rounded-md p-1"
                      id="cuisine"
                      name="cuisine"
                      placeholder="Cuisine"
                      value={inputData.cuisine}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-4 flex gap-1 flex-col">
                    <label
                      htmlFor="ingredients"
                      className="text-base text-gray-500 font-bold"
                    >
                      Ingredients:{" "}
                    </label>
                    <input
                      type="text"
                      className="border-2 border-gray-400 rounded-md p-1"
                      id="ingredients"
                      name="ingredients"
                      placeholder="Ingredients"
                      value={inputData.ingredients}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-4 flex gap-1 flex-col">
                    <label
                      htmlFor="image"
                      className="text-base text-gray-500 font-bold"
                    >
                      Image Link:{" "}
                    </label>
                    <input
                      type="text"
                      className="border-2 border-gray-400 rounded-md p-1"
                      id="image"
                      name="image"
                      placeholder="Image Link"
                      value={inputData.image}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-4 flex gap-1 flex-col">
                    <label
                      htmlFor="instructions"
                      className="text-base text-gray-500 font-bold"
                    >
                      Instructions: (Enter new step in new line)
                    </label>
                    <textarea
                      className="border-2 border-gray-400 rounded-md p-1"
                      id="instructions"
                      name="instructions"
                      cols="30"
                      rows="6"
                      placeholder="Instructions"
                      value={inputData.instructions}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={editRecipeHandler}
                    >
                      Edit
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

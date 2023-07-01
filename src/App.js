import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SingleRecipePage from "./pages/SingleRecipePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipe/:recipeID",
    element: <SingleRecipePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

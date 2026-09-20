import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home.tsx";
import Catalog from "./pages/Catalog/Catalog.tsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.tsx";
import MyLibrary from "./pages/MyLibrary/MyLibrary.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/catalog/movie/:movieID",
    element: <MovieDetails />,
  },
  {
    path: "/myLibrary",
    element: <MyLibrary />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Error from "./Error";
import ContentList from "./ContentList";
import RedirectToHome from "./RedirectToHome";
import CreateBookForm from "./forms/CreateBookForm";
import CreateAuthorForm from "./forms/CreateAuthorForm";
import CreateGenreForm from "./forms/CreateGenreForm";
import CreateBookInstanceForm from "./forms/CreateBookInstanceForm";
import Book from "./Book";
import Author from "./Author";
import Genre from "./Genre";
import BookInstance from "./BookInstance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToHome />,
    errorElement: <Error />,
  },
  {
    path: "/catalog",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "books",
        element: <ContentList content="books" />,
      },
      {
        path: "authors",
        element: <ContentList content="authors" />,
      },
      {
        path: "genres",
        element: <ContentList content="genres" />,
      },
      {
        path: "book-instances",
        element: <ContentList content="book-instances" />,
      },
      {
        path: "book/create",
        element: <CreateBookForm />,
      },
      {
        path: "book/:id",
        element: <Book />,
      },
      {
        path: "book/:id/update",
        // element: <Book />,
      },
      {
        path: "book/:id/delete",
        // element: <Book />,
      },
      {
        path: "author/create",
        element: <CreateAuthorForm />,
      },
      {
        path: "author/:id",
        element: <Author />,
      },
      {
        path: "author/:id/update",
        // element: <Author />,
      },
      {
        path: "author/:id/delete",
        // element: <Author />,
      },
      {
        path: "genre/create",
        element: <CreateGenreForm />,
      },
      {
        path: "genre/:id",
        element: <Genre />,
      },
      {
        path: "genre/:id/update",
        // element: <Genre />,
      },
      {
        path: "genre/:id/delete",
        // element: <Genre />,
      },
      {
        path: "book-instance/create",
        element: <CreateBookInstanceForm />,
      },
      {
        path: "book-instance/:id",
        element: <BookInstance />,
      },
      {
        path: "book-instance/:id/update",
        // element: <BookInstance />,
      },
      {
        path: "book-instance/:id/delete",
        // element: <BookInstance />,
      },
    ],
  },
]);

export default router;
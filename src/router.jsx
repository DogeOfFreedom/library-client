import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Error from "./Error";
import RedirectToHome from "./RedirectToHome";
import CreateBookForm from "./forms/CreateBookForm";
import CreateAuthorForm from "./forms/CreateAuthorForm";
import CreateGenreForm from "./forms/CreateGenreForm";
import CreateBookInstanceForm from "./forms/CreateBookInstanceForm";
import ContentList from "./ContentList";
import BookInstance from "./objects/BookInstance";
import Book from "./objects/Book";
import Author from "./objects/Author";
import Genre from "./objects/Genre";

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
        element: <ContentList key="book" type="book" />,
      },
      {
        path: "authors",
        element: <ContentList key="author" type="author" />,
      },
      {
        path: "genres",
        element: <ContentList key="genre" type="genre" />,
      },
      {
        path: "book_instances",
        element: <ContentList key="book instance" type="book instance" />,
      },
      {
        path: "books/create",
        element: <CreateBookForm />,
      },
      {
        path: "books/:id",
        element: <Book />,
      },
      {
        path: "books/:id/update",
        // element:
      },
      {
        path: "books/:id/delete",
        // element:
      },
      {
        path: "authors/create",
        element: <CreateAuthorForm />,
      },
      {
        path: "authors/:id",
        element: <Author />,
      },
      {
        path: "authors/:id/update",
        // element:
      },
      {
        path: "authors/:id/delete",
        // element:
      },
      {
        path: "genres/create",
        element: <CreateGenreForm />,
      },
      {
        path: "genres/:id",
        element: <Genre />,
      },
      {
        path: "genres/:id/update",
        // element:
      },
      {
        path: "genres/:id/delete",
        // element:
      },
      {
        path: "book_instances/create",
        element: <CreateBookInstanceForm />,
      },
      {
        path: "book_instances/:id",
        element: <BookInstance />,
      },
      {
        path: "book_instances/:id/update",
        // element:
      },
      {
        path: "book_instances/:id/delete",
        // element:
      },
    ],
  },
]);

export default router;

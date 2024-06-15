import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Error from "./Error";
import RedirectToHome from "./RedirectToHome";
import CreateBookForm from "./forms/CreateBookForm";
import CreateAuthorForm from "./forms/CreateAuthorForm";
import CreateGenreForm from "./forms/CreateGenreForm";
import CreateBookInstanceForm from "./forms/CreateBookInstanceForm";
import Book from "./Book";
import Author from "./Author";
import Genre from "./Genre";
import BookInstance from "./BookInstance";
import ContentList from "./ContentList";

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
        path: "book/create",
        element: <CreateBookForm />,
      },
      {
        path: "book/:id",
        element: <Book />,
      },
      {
        path: "book/:id/update",
        // element:
      },
      {
        path: "book/:id/delete",
        // element:
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
        // element:
      },
      {
        path: "author/:id/delete",
        // element:
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
        // element:
      },
      {
        path: "genre/:id/delete",
        // element:
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
        // element:
      },
      {
        path: "book-instance/:id/delete",
        // element:
      },
    ],
  },
]);

export default router;

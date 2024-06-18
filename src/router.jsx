import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Error from "./Error";
import RedirectToHome from "./RedirectToHome";
import BookForm from "./forms/BookForm";
import AuthorForm from "./forms/AuthorForm";
import GenreForm from "./forms/GenreForm";
import BookInstanceForm from "./forms/BookInstanceForm";
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
        element: <BookForm method="POST" />,
      },
      {
        path: "books/:id/update",
        element: <BookForm method="PUT" />,
      },
      {
        path: "books/:id/delete",
        // element:
      },
      {
        path: "books/:id",
        element: <Book />,
      },
      {
        path: "authors/create",
        element: <AuthorForm key="createAuthor" method="POST" />,
      },
      {
        path: "authors/:id/update",
        element: <AuthorForm key="updateAuthor" method="PUT" />,
      },
      {
        path: "authors/:id/delete",
        // element:
      },
      {
        path: "authors/:id",
        element: <Author />,
      },
      {
        path: "genres/create",
        element: <GenreForm key="createGenre" method="POST" />,
      },
      {
        path: "genres/:id/update",
        element: <GenreForm key="updateGenre" method="PUT" />,
      },
      {
        path: "genres/:id/delete",
        // element:
      },
      {
        path: "genres/:id",
        element: <Genre />,
      },
      {
        path: "book_instances/create",
        element: <BookInstanceForm method="POST" />,
      },
      {
        path: "book_instances/:id/update",
        element: <BookInstanceForm method="PUT" />,
      },
      {
        path: "book_instances/:id/delete",
        // element:
      },
      {
        path: "book_instances/:id",
        element: <BookInstance />,
      },
    ],
  },
]);

export default router;

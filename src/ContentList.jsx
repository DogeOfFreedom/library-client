import { useEffect, useRef, useState } from "react";
import LoadingWheel from "./LoadingWheel";
import ErrorComponent from "./ErrorComponent";
import PropTypes from "prop-types";
import {
  createBook,
  createAuthor,
  createBookInstance,
  createGenre,
} from "./CreateObj";

export default function ContentList({ type }) {
  const [objs, setObjs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let url;
  let createObj;
  let title;

  switch (type) {
    case "book":
      url = "http://localhost:3000/book/all";
      createObj = createBook;
      title = "Book List";
      break;
    case "genre":
      url = "http://localhost:3000/genre/all";
      createObj = createGenre;
      title = "Genre List";
      break;
    case "author":
      url = "http://localhost:3000/author/all";
      createObj = createAuthor;
      title = "Author List";
      break;
    case "book instance":
      url = "http://localhost:3000/book_instance/all";
      createObj = createBookInstance;
      title = "Book Instance List";
      break;
  }

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => JSON.parse(json))
      .then((obj) => setObjs(obj))
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const createList = () => {
    const elements = [];
    for (const key in objs) {
      const element = createObj(objs[key]);
      elements.push(element);
    }
    return elements;
  };

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <h1>{title}</h1>
      <ul>{createList()}</ul>
    </>
  );
}

ContentList.propTypes = {
  type: PropTypes.oneOf(["book", "author", "genre", "book instance"]),
};

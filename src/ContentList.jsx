import { useEffect, useState } from "react";
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

  const hostname = import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
  switch (type) {
    case "book":
      url = `${hostname}/book/all`;
      createObj = createBook;
      title = "Book List";
      break;
    case "genre":
      url = `${hostname}/genre/all`;
      createObj = createGenre;
      title = "Genre List";
      break;
    case "author":
      url = `${hostname}/author/all`;
      createObj = createAuthor;
      title = "Author List";
      break;
    case "book instance":
      url = `${hostname}/book_instance/all`;
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
      <ul className="contentList">{createList()}</ul>
    </>
  );
}

ContentList.propTypes = {
  type: PropTypes.oneOf(["book", "author", "genre", "book instance"]),
};

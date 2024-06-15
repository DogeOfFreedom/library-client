import { useEffect, useState } from "react";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import { Link } from "react-router-dom";

export default function BookList() {
  const [bookObjs, setBooksObjs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/book/all")
      .then((data) => data.json())
      .then((json) => JSON.parse(json))
      .then((obj) => setBooksObjs(obj))
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);

  const renderBookList = () => {
    const books = [];
    for (const key in bookObjs) {
      const book = bookObjs[key];
      const id = book._id;
      const title = book.title;
      const firstname = book.author.firstname;
      const lastname = book.author.lastname;
      const element = (
        <li key={id}>
          <Link to={id}>{title}</Link> {`${firstname}, ${lastname}`}
        </li>
      );
      books.push(element);
    }
    return books;
  };

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <h1>Book List</h1>
      <ul>{renderBookList()}</ul>
    </>
  );
}

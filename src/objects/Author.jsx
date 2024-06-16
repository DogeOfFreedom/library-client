import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import object from "./object.module.css";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import Footer from "./Footer";
import { convertDate, capitalize } from "../util";

export default function Author() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const authorResponse = await fetch(`http://localhost:3000/author/${id}`);
      const authorObj = (await JSON.parse(await authorResponse.json()))[0];
      const authorId = authorObj._id;
      setAuthor(authorObj);
      const booksResponse = await fetch(
        `http://localhost:3000/book/author/${authorId}`
      );
      const booksObj = await JSON.parse(await booksResponse.json());
      setBooks(booksObj);
      setLoading(false);
    };

    try {
      fetchData();
    } catch (e) {
      setError(e);
    }
  }, []);

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <div>
      <h1>
        <b>Author:</b>{" "}
        {`${capitalize(author.firstname)}, ${capitalize(author.lastname)}`}
      </h1>
      <p>{`${convertDate(new Date(author.dob))} - ${convertDate(
        new Date(author.dod)
      )}`}</p>
      <div className={object.displayContainer}>
        <h3>Books</h3>
        {books.map((book) => {
          return (
            <div className={object.bookItem} key={book._id}>
              <div className={object.bookDetails}>
                <p>
                  <Link to={`/catalog/books/${book._id}`}>{book.title}</Link>
                </p>
                <p>{book.summary}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Footer type="book" />
    </div>
  );
}

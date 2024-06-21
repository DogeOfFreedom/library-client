import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import object from "../object.module.css";
import LoadingWheel from "../../LoadingWheel";
import ErrorComponent from "../../ErrorComponent";

export default function BookList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const hostname =
        import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
      const bookResponse = await fetch(`${hostname}/genre/${id}/books`);
      const bookObj = (await JSON.parse(await bookResponse.json()))[0].books;
      setBooks(bookObj);
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
    </div>
  );
}

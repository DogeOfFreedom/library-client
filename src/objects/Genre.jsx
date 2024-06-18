import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import object from "./object.module.css";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import Footer from "./Footer";
import { capitalize } from "../util";

export default function Genre() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const genreResponse = await fetch(`http://localhost:3000/genre/${id}`);
      const genreObj = (await JSON.parse(await genreResponse.json()))[0];
      setGenre(genreObj);
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
        <b>Genre:</b> {capitalize(genre.name)}
      </h1>
      <div className={object.displayContainer}>
        <h3>Books</h3>
        {genre.books.map((book) => {
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
      <Footer type="genre" />
    </div>
  );
}

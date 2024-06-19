import LoadingWheel from "../../LoadingWheel";
import ErrorComponent from "../../ErrorComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Book
      const bookResponse = await fetch(`http://localhost:3000/book/${id}`);
      const bookObj = (await JSON.parse(await bookResponse.json()))[0];
      setBook(bookObj);

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
    <>
      <h1>
        <b>Title:</b> {book.title}
      </h1>
      <p>
        <b>Author:</b> {`${book.author.firstname}, ${book.author.lastname}`}
      </p>
      <p>
        <b>Summary:</b> {book.summary}
      </p>
      <p>
        <b>ISBN:</b> {book.ISBN}
      </p>
      <p>
        <b>Genre:</b> {book.genre}
      </p>
    </>
  );
}

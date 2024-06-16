import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import object from "./object.module.css";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import Footer from "./Footer";

export default function Book() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState(null);
  const [bookInstances, setBookInstances] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const bookResponse = await fetch(`http://localhost:3000/book/${id}`);
      const bookObj = (await JSON.parse(await bookResponse.json()))[0];
      const bookId = bookObj._id;
      setBook(bookObj);
      const bookInstancesResponse = await fetch(
        `http://localhost:3000/book_instance/get_instances/${bookId}`
      );
      const bookInstancesObj = await JSON.parse(
        await bookInstancesResponse.json()
      );
      setBookInstances(bookInstancesObj);
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
      <div className={object.displayContainer}>
        <h3>Copies</h3>
        {bookInstances.map((bookInstance) => {
          return (
            <div className={object.bookInstanceItem} key={bookInstance._id}>
              <hr />
              <div className={object.bookInstanceDetails}>
                <p>{bookInstance.status}</p>
                <p>
                  <b>Imprint: </b> {bookInstance.imprint}
                </p>
                <p>
                  <b>Id: </b>
                  <Link to={`/catalog/book_instances/${bookInstance._id}`}>
                    {bookInstance._id}
                  </Link>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <Footer type="book" />
    </div>
  );
}

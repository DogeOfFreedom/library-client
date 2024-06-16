import { convertDate, capitalize } from "../util";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import Footer from "./Footer";

export default function BookInstance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [bookInstance, setBookInstance] = useState(null);
  const url = `http://localhost:3000/book_instance/${id}`;

  useEffect(() => {
    fetch(url)
      .then((data) => data.json())
      .then((json) => JSON.parse(json))
      .then((data) => {
        setBookInstance(data[0]);
      })
      .catch((e) => setError(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <h1>
        <b>ID: </b>
        {bookInstance._id}
      </h1>
      <p>
        <b>Title: </b> <Link>{bookInstance.book.title}</Link>
      </p>
      <p>
        <b>Imprint: </b> {bookInstance.imprint}
      </p>
      <p>
        <b>Status: </b> {bookInstance.status}
      </p>
      {bookInstance !== "Available" && (
        <p>
          <b>Due Back:</b> {convertDate(new Date(bookInstance.doa))}
        </p>
      )}
      <Footer type="book instance" />
    </>
  );
}

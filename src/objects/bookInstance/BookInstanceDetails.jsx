import { convertDate } from "../../util";
import { useState, useEffect } from "react";
import LoadingWheel from "../../LoadingWheel";
import ErrorComponent from "../../ErrorComponent";
import { Link, useParams } from "react-router-dom";

export default function BookInstanceDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [bookInstance, setBookInstance] = useState(null);

  useEffect(() => {
    const hostname = import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
    const url = `${hostname}/book_instance/${id}`;
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
        <b>Status: </b>{" "}
        <span className={bookInstance.status.toLowerCase()}>
          {bookInstance.status}
        </span>
      </p>
      {bookInstance !== "Available" && (
        <p>
          <b>Due Back:</b> {convertDate(new Date(bookInstance.doa))}
        </p>
      )}
    </>
  );
}

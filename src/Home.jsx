import { useEffect, useState } from "react";
import LoadingWheel from "./LoadingWheel";
import ErrorComponent from "./ErrorComponent";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookCount, setBookCount] = useState(0);
  const [genreCount, setGenreCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [bookInstanceCount, setBookInstanceCount] = useState(0);
  const [bookAvailableInstanceCount, setBookAvailableInstanceCount] =
    useState(0);

  useEffect(() => {
    const hostname = import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
    const p1 = fetch(`${hostname}/book/count`);
    const p2 = fetch(`${hostname}/book_instance/count`);
    const p3 = fetch(`${hostname}/book_instance/count_available`);
    const p4 = fetch(`${hostname}/author/count`);
    const p5 = fetch(`${hostname}/genre/count`);
    Promise.all([p1, p2, p3, p4, p5])
      .then((results) => results.map((result) => result.json()))
      .then((promises) => {
        promises[0].then((data) => setBookCount(data));
        promises[1].then((data) => setBookInstanceCount(data));
        promises[2].then((data) => setBookAvailableInstanceCount(data));
        promises[3].then((data) => setAuthorCount(data));
        promises[4].then((data) => setGenreCount(data));
        setLoading(false);
      })
      .catch((e) => setError(e));
  }, []);

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <div className="homeHeader">
        <h1>Local Library Home</h1>
        <p>
          A simple bare bones library app the follows the MDN library tutorial
          but made in React.
        </p>
      </div>
      <hr />
      <div className="homeContent">
        <p>The library has the following record counts:</p>
        <ul>
          <li>
            <b>Books:</b> {bookCount}
          </li>
          <li>
            <b>Copies:</b> {bookInstanceCount}
          </li>
          <li>
            <b>Copies available:</b> {bookAvailableInstanceCount}
          </li>
          <li>
            <b>Authors</b> {authorCount}
          </li>
          <li>
            <b>Genres:</b> {genreCount}
          </li>
        </ul>
      </div>
    </>
  );
}

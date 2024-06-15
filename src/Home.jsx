import { useEffect, useState } from "react";

export default function Home() {
  const [bookCount, setBookCount] = useState(0);
  const [genreCount, setGenreCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);
  const [bookInstanceCount, setBookInstanceCount] = useState(0);
  const [bookAvailableInstanceCount, setBookAvailableInstanceCount] =
    useState(0);

  useEffect(() => {
    const p1 = fetch("http://localhost:3000/book/count");
    const p2 = fetch("http://localhost:3000/book_instance/count");
    const p3 = fetch("http://localhost:3000/book_instance/count_available");
    const p4 = fetch("http://localhost:3000/author/count");
    const p5 = fetch("http://localhost:3000/genre/count");
    Promise.all([p1, p2, p3, p4, p5])
      .then((results) => results.map((result) => result.json()))
      .then((promises) => {
        promises[0].then((data) => setBookCount(data));
        promises[1].then((data) => setBookInstanceCount(data));
        promises[2].then((data) => setBookAvailableInstanceCount(data));
        promises[3].then((data) => setAuthorCount(data));
        promises[4].then((data) => setGenreCount(data));
      });
  }, []);

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

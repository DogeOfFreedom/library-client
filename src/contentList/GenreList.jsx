import { useEffect, useState } from "react";

export default function GenreList() {
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    console.log("Placeholder DB GET");
  }, []);

  return (
    <>
      <h1>Genre List</h1>
      <ul>{/* Fetch */}</ul>
    </>
  );
}

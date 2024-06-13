import { useEffect, useState } from "react";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("Placeholder DB GET");
  }, []);

  return (
    <>
      <h1>Book List</h1>
      <ul>{/* Fetch */}</ul>
    </>
  );
}

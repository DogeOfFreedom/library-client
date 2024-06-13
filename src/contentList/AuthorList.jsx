import { useEffect, useState } from "react";

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    console.log("Placeholder DB GET");
  }, []);

  return (
    <>
      <h1>Author List</h1>
      <ul>{/* Fetch */}</ul>
    </>
  );
}

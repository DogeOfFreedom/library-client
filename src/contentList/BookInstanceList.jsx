import { useEffect, useState } from "react";

export default function BookInstanceList() {
  const [bookInstances, setBookInstances] = useState([]);

  useEffect(() => {
    console.log("Placeholder DB GET");
  }, []);

  return (
    <>
      <h1>Book Instance List</h1>
      <ul>{/* Fetch */}</ul>
    </>
  );
}

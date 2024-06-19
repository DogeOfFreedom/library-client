import DeleteBtn from "../DeleteBtn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GenreDetails from "./GenreDetails";
import BookList from "./BookList";

export default function DeleteGenre() {
  const { id } = useParams();
  const [booksExist, setBooksExist] = useState(false);

  useEffect(() => {
    const checkForInstances = async () => {
      const books = await fetch(`http://localhost:3000/genre/${id}/books`);
      const booksObj = await JSON.parse(await books.json())[0].books;

      if (booksObj.length > 0) {
        setBooksExist(true);
      }
    };
    checkForInstances();
  }, []);

  return (
    <div>
      <GenreDetails />
      {booksExist ? (
        <>
          <p>
            <b>
              Delete the following books before attempting to delete the genre
            </b>
          </p>
          <BookList />
        </>
      ) : (
        <DeleteBtn type="genre" />
      )}
    </div>
  );
}

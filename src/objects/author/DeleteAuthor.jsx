import DeleteBtn from "../DeleteBtn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthorDetails from "./AuthorDetails";
import BookList from "./BookList";

export default function DeleteAuthor() {
  const { id } = useParams();
  const [booksExist, setBooksExist] = useState(false);

  useEffect(() => {
    const checkForInstances = async () => {
      const books = await fetch(`http://localhost:3000/book/author/${id}`);
      const booksObj = await JSON.parse(await books.json());

      if (booksObj.length > 0) {
        setBooksExist(true);
      }
    };
    checkForInstances();
  }, []);

  return (
    <div>
      <AuthorDetails />
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
        <DeleteBtn type="author" />
      )}
    </div>
  );
}

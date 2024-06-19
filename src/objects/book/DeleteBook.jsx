import DeleteBtn from "../DeleteBtn";
import BookDetails from "./BookDetails";
import BookInstancesList from "./BookInstancesList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DeleteBook() {
  const { id } = useParams();
  const [bookInstancesExist, setBookInstancesExist] = useState(false);

  useEffect(() => {
    const checkForInstances = async () => {
      const bookInstances = await fetch(
        `http://localhost:3000/book_instance/get_instances/${id}`
      );
      const bookInstancesObj = await JSON.parse(await bookInstances.json());

      if (bookInstancesObj.length > 0) {
        setBookInstancesExist(true);
      }
    };
    checkForInstances();
  }, []);

  return (
    <div>
      <BookDetails />
      {bookInstancesExist ? (
        <>
          <p>
            <b>
              Delete the following copies before attempting to delete the book
            </b>
          </p>
          <BookInstancesList />
        </>
      ) : (
        <DeleteBtn type="book" />
      )}
    </div>
  );
}

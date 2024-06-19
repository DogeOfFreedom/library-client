import BookInstanceDetails from "./BookInstanceDetails";
import DeleteBtn from "../DeleteBtn";

export default function DeleteBookInstance() {
  return (
    <>
      <BookInstanceDetails />
      <DeleteBtn type="book_instance" />
    </>
  );
}

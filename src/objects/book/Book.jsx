import Footer from "../Footer";
import BookDetails from "./BookDetails";
import BookInstancesList from "./BookInstancesList";

export default function Book() {
  return (
    <div>
      <BookDetails />
      <BookInstancesList />
      <Footer type="book" />
    </div>
  );
}

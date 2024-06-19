import Footer from "../Footer";
import AuthorDetails from "./AuthorDetails";
import BookList from "./BookList";

export default function Author() {
  return (
    <div>
      <AuthorDetails />
      <BookList />
      <Footer type="author" />
    </div>
  );
}

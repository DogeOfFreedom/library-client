import Footer from "../Footer";
import GenreDetails from "./GenreDetails";
import BookList from "./BookList";

export default function Genre() {
  return (
    <div>
      <GenreDetails />
      <BookList />
      <Footer type="genre" />
    </div>
  );
}

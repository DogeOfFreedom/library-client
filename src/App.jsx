import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="navColumn columnSection">
        <div className="linksContainer">
          <Link to="/catalog">Home</Link>
          <Link to="books">All books</Link>
          <Link to="authors">All authors</Link>
          <Link to="genres">All genres</Link>
          <Link to="book-instances">All book-instances</Link>
        </div>
        <hr />
        <div className="linksContainer">
          <Link to="book/create">Create new book</Link>
          <Link to="author/create">Create new author</Link>
          <Link to="genre/create">Create new genre</Link>
          <Link to="book-instance/create">Create new book instance</Link>
        </div>
      </div>
      <div className="contentColumn columnSection">
        <Outlet />
      </div>
    </>
  );
}

export default App;

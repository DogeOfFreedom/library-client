import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="navColumn columnSection">
        <div className="linksContainer">
          <Link to="/catalog">Home</Link>
          <Link to="books">All Books</Link>
          <Link to="authors">All Authors</Link>
          <Link to="genres">All Genres</Link>
          <Link to="book_instances">All Book Instances</Link>
        </div>
        <hr />
        <div className="linksContainer">
          <Link to="books/create">Create New Book</Link>
          <Link to="authors/create">Create New Author</Link>
          <Link to="genres/create">Create New Genre</Link>
          <Link to="book_instances/create">Create New Book Instance</Link>
        </div>
      </div>
      <div className="contentColumn columnSection">
        <Outlet />
      </div>
    </>
  );
}

export default App;

import { Link } from "react-router-dom";
import { convertDate, capitalize } from "../util";
import object from "./object.module.css";

const createBookInstanceDisplay = (bookInstance) => {
  return (
    <>
      <h1>
        <b>ID: </b>
        {bookInstance._id}
      </h1>
      <p>
        <b>Title: </b> <Link>{bookInstance.book.title}</Link>
      </p>
      <p>
        <b>Imprint: </b> {bookInstance.imprint}
      </p>
      <p>
        <b>Status: </b> {bookInstance.status}
      </p>
      {bookInstance !== "Available" && (
        <p>
          <b>Due Back:</b> {convertDate(new Date(bookInstance.doa))}
        </p>
      )}
    </>
  );
};

const createBookDisplay = async (book) => {
  const id = book._id;
  const url = `http://localhost:3000/book_instance/get_instances/${id}`;
  const response = await fetch(url);
  //   const bookInstances = await JSON.parse(await response.json());
  //   console.log(bookInstances);

  return (
    <>
      <h1>hi</h1>
      {/* <h1>Title: {book.title}</h1>
      <p>
        <b>Author: </b> {capitalize(book.author.firstname)},{" "}
        {capitalize(book.author.lastname)}
      </p>
      <p>
        <b>Summary: </b>
        {book.summary}
      </p>
      <p>
        <b>ISBN: </b>
        {book.ISBN}
      </p>
      <p>
        <b>Genre: </b>
        {book.genre.toString()}
      </p>
      <div className={object.objListContainer}>
        <h2>Copies</h2>
        {bookInstances.map((bookInstance) => {
          return (
            <div key={bookInstance._id} className={object.bookInstanceItem}>
              <hr />
              <p>{bookInstance.status}</p>
              <p>
                <b>Imprint: </b>
                {bookInstance.imprint}
              </p>
              <p>
                <b>Id: </b> {bookInstance._id}
              </p>
            </div>
          );
        })}
      </div> */}
    </>
  );
};

const createBookList = (Books) => {
  return (
    <div>
      <h2>Books</h2>
      {Books.map((book) => {
        <div className={object.bookItem}>
          <Link>{book.title}</Link>
          <p>{book.summary}</p>
        </div>;
      })}
    </div>
  );
};

const createAuthorDisplay = () => {
  return true;
};

const createGenreDisplay = () => {
  return true;
};

export {
  createBookInstanceDisplay,
  createBookDisplay,
  createAuthorDisplay,
  createGenreDisplay,
};

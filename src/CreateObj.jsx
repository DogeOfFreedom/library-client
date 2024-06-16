import { Link } from "react-router-dom";
import { convertDate, capitalize } from "./util";

const createBook = (book) => {
  const id = book._id;
  const title = book.title;
  const firstname = capitalize(book.author.firstname);
  const lastname = capitalize(book.author.lastname);
  const element = (
    <li key={id}>
      <Link to={id}>{title}</Link> {`(${firstname}, ${lastname})`}
    </li>
  );
  return element;
};

const createGenre = (genre) => {
  const id = genre._id;
  const name = capitalize(genre.name);
  const element = (
    <li key={id}>
      <Link to={id}>{name}</Link>
    </li>
  );
  return element;
};

const createAuthor = (author) => {
  const id = author._id;
  const firstname = capitalize(author.firstname);
  const lastname = capitalize(author.lastname);
  const dob = convertDate(new Date(author.dob));
  const dod = convertDate(new Date(author.dod));
  const element = (
    <li key={id}>
      <Link to={id}>{`${firstname}, ${lastname}`}</Link> {`(${dob} - ${dod})`}
    </li>
  );
  return element;
};

const createBookInstance = (bookInstance) => {
  const id = bookInstance._id;
  const title = capitalize(bookInstance.book.title);
  const imprint = bookInstance.imprint;
  const status = bookInstance.status;

  let element;
  if (status == "Available") {
    element = (
      <li key={id}>
        <Link to={id}>{`${title} : ${imprint}.`}</Link> {` - ${status}`}
      </li>
    );
  } else {
    const doa = convertDate(new Date(bookInstance.doa));
    element = (
      <li key={id}>
        <Link to={id}>{`${title} : ${imprint}.`}</Link>{" "}
        {` - ${status} (${doa})`}
      </li>
    );
  }
  return element;
};

export { createBook, createAuthor, createBookInstance, createGenre };

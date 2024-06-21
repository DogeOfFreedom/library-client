import { useEffect, useState } from "react";
import Modal from "./Model";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

export default function BookInstanceForm({ method }) {
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);

  const [chosenBook, setChosenBook] = useState("");
  const [imprint, setImprint] = useState("");
  const [doa, setDoa] = useState("");
  const statuses = ["Available", "Maintainence", "Loaned", "Reserved"];
  const [status, setStatus] = useState(statuses[0]);
  const { id } = useParams();

  let url;
  const hostname = import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
  if (method == "POST" && id === undefined) {
    url = `${hostname}/book_instance/create`;
  } else if (method == "PUT" && id !== undefined) {
    url = `${hostname}/book_instance/${id}/update`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksArray = [];
        const booksData = await fetch(`${hostname}/book/book_instances`);
        const booksDataProcessed = await JSON.parse(await booksData.json());
        for (let i in booksDataProcessed) {
          const item = booksDataProcessed[i];
          booksArray.push(item);
        }
        setBooks(booksArray);
        setChosenBook(booksArray[0]._id);

        if (method === "PUT" && id !== undefined) {
          const bookInstanceData = await fetch(
            `${hostname}/book_instance/${id}`
          );
          const bookInstance = await JSON.parse(await bookInstanceData.json());
          setChosenBook(bookInstance[0].book);
          setImprint(bookInstance[0].imprint);
          setDoa(format(bookInstance[0].doa.slice(0, 10), "yyyy-MM-dd"));
          setStatus(bookInstance[0].status);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, method]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formObj = { book: chosenBook, imprint, doa, status };
    if (method === "PUT") {
      formObj = { ...formObj, id };
    }

    fetch(url, {
      method,
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formObj),
    })
      .then((res) => res.json())
      .then((res) => {
        setMsg(res.message);
        setOpenModal(true);
      });
  };

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="book">Book:</label>
          <select
            name="book"
            value={chosenBook}
            onChange={(e) => setChosenBook(e.target.value)}
            placeholder="--Please select a book--"
          >
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
        <div className="inputContainer">
          <label htmlFor="imprint">Imprint:</label>
          <input
            type="text"
            id="imprint"
            value={imprint}
            onChange={(e) => setImprint(e.target.value)}
            placeholder="Publisher and date information"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="doa">Date of availability:</label>
          <input
            type="date"
            value={doa}
            onChange={(e) => setDoa(e.target.value)}
            id="doa"
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="status">Status:</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="--Please select a status--"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
      <Modal setOpen={setOpenModal} open={openModal} message={msg} />
    </>
  );
}

BookInstanceForm.propTypes = {
  method: PropTypes.string,
};

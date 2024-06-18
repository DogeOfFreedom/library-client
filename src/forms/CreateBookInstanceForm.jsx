import { useEffect, useState } from "react";
import Modal from "./Model";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";

export default function CreateBookInstanceForm() {
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

  useEffect(() => {
    const fetchData = async () => {
      const booksArray = [];
      const booksData = await fetch(
        "http://localhost:3000/book/book_instances"
      );
      const booksDataProcessed = await JSON.parse(await booksData.json());
      for (let i in booksDataProcessed) {
        const item = booksDataProcessed[i];
        booksArray.push(item);
      }
      setBooks(booksArray);
      setChosenBook(booksArray[0]);
    };

    try {
      fetchData();
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObj = { book: chosenBook._id, imprint, doa, status };
    fetch("http://localhost:3000/book_instance/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formObj),
    }).then((res) => {
      if (res.message) {
        setMsg(res.message);
      } else {
        setMsg("Book Instance Added!");
      }
      setOpenModal(true);
    });
  };

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
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

        <div>
          <label htmlFor="imprint">Imprint:</label>
          <input
            type="text"
            id="imprint"
            value={imprint}
            onChange={(e) => setImprint(e.target.value)}
            placeholder="Publisher and date information"
          />
        </div>

        <div>
          <label htmlFor="doa">Date of availability:</label>
          <input
            type="date"
            value={doa}
            onChange={(e) => setDoa(e.target.value)}
            id="doa"
          />
        </div>

        <div>
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
        <button type="submit">Submit</button>
      </form>
      <Modal setOpen={setOpenModal} open={openModal} message={msg} />
    </>
  );
}

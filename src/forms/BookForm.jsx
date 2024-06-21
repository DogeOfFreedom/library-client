import { useEffect, useState } from "react";
import Modal from "./Model";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

export default function BookForm({ method }) {
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [ISBN, setISBN] = useState("");
  const [checkedState, setCheckedState] = useState([]);
  const { id } = useParams();

  let url;
  const hostname = import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
  if (method == "POST" && id === undefined) {
    url = `${hostname}/book/create`;
  } else if (method == "PUT" && id !== undefined) {
    url = `${hostname}/book/${id}/update`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const authorsArray = [];
      try {
        const authorData = await fetch(`${hostname}/author/names`);
        const authorDataProcessed = await JSON.parse(await authorData.json());
        for (const i in authorDataProcessed) {
          const item = authorDataProcessed[i];
          const name = `${item.firstname} ${item.lastname}`;
          const obj = {
            id: item._id,
            name,
          };
          authorsArray.push(obj);
        }
        setAuthors(authorsArray);
        setAuthor(authorsArray[0].id);

        const genresArray = [];
        const genreData = await fetch(`${hostname}/genre/names`);
        const genreDataProcessed = await JSON.parse(await genreData.json());
        for (const i in genreDataProcessed) {
          const item = genreDataProcessed[i];
          genresArray.push(item.name);
        }
        setGenres(genresArray);
        setCheckedState(() => new Array(genresArray.length).fill(false));

        if (method === "PUT" && id !== undefined) {
          const bookData = await fetch(`${hostname}/book/${id}`);
          const book = await JSON.parse(await bookData.json());
          setTitle(book[0].title);
          setAuthor(book[0].author._id);
          setSummary(book[0].summary);
          setISBN(book[0].ISBN);
          const bookGenres = book[0].genre;
          const selectedGenres = bookGenres.map((bookGenre) =>
            genresArray.indexOf(bookGenre)
          );
          const newCheckedState = new Array(genresArray.length).fill(false);
          for (const selectedGenre of selectedGenres) {
            newCheckedState[selectedGenre] = true;
          }
          setCheckedState(newCheckedState);
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchData();
  }, [id, method]);

  const handleCheckboxChange = (e) => {
    const newCheckedState = [...checkedState];
    const index = Number(e.target.dataset.index);
    newCheckedState[index] = e.target.checked;
    setCheckedState(newCheckedState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const chosenGenres = [];
    for (let i = 0; i < genres.length; i++) {
      if (checkedState[i]) {
        chosenGenres.push(genres[i]);
      }
    }

    let formObj = {
      title,
      author,
      summary,
      ISBN,
      genres: chosenGenres,
    };
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
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Name of book"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="author">Author:</label>
          <select
            name="author"
            id="author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            required
          >
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className="inputContainer">
          <label htmlFor="summary">Summary:</label>
          <textarea
            name="summary"
            id="summary"
            placeholder="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>
        <div className="inputContainer">
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            placeholder="ISBN13"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
          />
        </div>
        <div className="checkboxContainer">
          {genres.map((genre) => {
            const index = genres.indexOf(genre);
            const checked = checkedState[index];
            return (
              <div key={genre}>
                <input
                  type="checkbox"
                  data-index={index}
                  checked={checked}
                  onChange={handleCheckboxChange}
                  value={genre}
                  name={genre}
                  id={genre}
                />
                <label htmlFor={genre}>{genre}</label>
              </div>
            );
          })}
        </div>
        <button className="submitBtn" type="submit">
          Submit
        </button>
      </form>
      <Modal setOpen={setOpenModal} open={openModal} message={msg} />
    </>
  );
}

BookForm.propTypes = {
  method: PropTypes.string,
};

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Model";
import PropTypes from "prop-types";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";

export default function GenreForm({ method }) {
  const [genre, setGenre] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();

  let url;
  if (method == "POST" && id === undefined) {
    url = "http://localhost:3000/genre/create";
  } else if (method == "PUT" && id !== undefined) {
    url = `http://localhost:3000/genre/${id}/update`;
  }

  useEffect(() => {
    if (method == "PUT" && id !== null) {
      const fetchGenre = async () => {
        const genreData = await fetch(`http://localhost:3000/genre/${id}`);
        const genre = await JSON.parse(await genreData.json());
        setGenre(genre[0].name);
      };

      try {
        fetchGenre();
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObj = { name: genre.toLowerCase(), id };
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

  if (loading && method === "PUT") return <LoadingWheel />;
  if (error && method === "PUT") return <ErrorComponent />;

  return (
    <>
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            name="genre"
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Name of Genre"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Modal setOpen={setOpenModal} open={openModal} message={msg} />
    </>
  );
}

GenreForm.propTypes = {
  method: PropTypes.string,
};

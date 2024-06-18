import { useState } from "react";
import Modal from "./Model";

export default function CreateGenreForm() {
  const [genre, setGenre] = useState("");
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObj = { genre };
    fetch("http://localhost:3000/genre/create", {
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
        setMsg("Genre Added!");
      }
      setOpenModal(true);
    });
  };

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

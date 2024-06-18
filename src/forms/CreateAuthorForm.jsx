import { useState } from "react";
import Modal from "./Model";

export default function CreateBookForm() {
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formObj = {
      firstname,
      lastname,
      dob: dob,
      dod: dod,
    };
    fetch("http://localhost:3000/author/create", {
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
        setMsg("Author Added!");
      }
      setOpenModal(true);
    });
  };

  return (
    <>
      <form action="" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            id="firstname"
            placeholder="First name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            id="lastname"
            placeholder="Last name"
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of birth:</label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            id="dob"
            required
          />
        </div>
        <div>
          <label htmlFor="dod">Date of death:</label>
          <input
            type="date"
            name="dod"
            value={dod}
            onChange={(e) => setDod(e.target.value)}
            id="dod"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Modal setOpen={setOpenModal} open={openModal} message={msg} />
    </>
  );
}

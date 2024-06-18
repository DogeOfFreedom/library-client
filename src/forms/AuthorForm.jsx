import { useEffect, useState } from "react";
import Modal from "./Model";
import PropTypes from "prop-types";
import LoadingWheel from "../LoadingWheel";
import ErrorComponent from "../ErrorComponent";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

export default function AuthorForm({ method }) {
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  let url;
  if (method == "POST" && id === undefined) {
    url = "http://localhost:3000/author/create";
  } else if (method == "PUT" && id !== undefined) {
    url = `http://localhost:3000/author/${id}/update`;
  }

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");

  useEffect(() => {
    if (method == "PUT" && id !== null) {
      const fetchAuthor = async () => {
        const authorData = await fetch(`http://localhost:3000/author/${id}`);
        const author = await JSON.parse(await authorData.json());
        setFirstname(author[0].firstname);
        setLastname(author[0].lastname);
        setDob(format(author[0].dob.slice(0, 10), "yyyy-MM-dd"));
        setDod(format(author[0].dod.slice(0, 10), "yyyy-MM-dd"));
      };

      try {
        fetchAuthor();
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let formObj;
    formObj = {
      firstname,
      lastname,
      dob: dob,
      dod: dod,
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

  if (loading && method === "PUT") return <LoadingWheel />;
  if (error && method === "PUT") return <ErrorComponent />;

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

AuthorForm.propTypes = {
  method: PropTypes.string,
};

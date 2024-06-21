import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteBtn({ type }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const hostname = import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
  const url = `${hostname}/${type}/${id}/delete`;
  const deleteObj = async () => {
    await fetch(url, {
      method: "DELETE",
    });
    console.log(type);
    navigate(`/catalog/${type}s`);
  };

  return (
    <>
      <button className="deleteBtn" onClick={deleteObj}>
        <span className="btnElem">Delete</span>
      </button>
    </>
  );
}

DeleteBtn.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["book", "author", "genre", "book_instance"]),
};

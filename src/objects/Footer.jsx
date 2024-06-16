import object from "./object.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Footer({ type }) {
  return (
    <div className={object.optionsContainer}>
      <hr />
      <Link to="delete">{`Delete ${type}`}</Link>
      <Link to="update">{`Update ${type}`}</Link>
    </div>
  );
}

Footer.propTypes = {
  type: PropTypes.oneOf(["book", "author", "genre", "book instance"]),
};

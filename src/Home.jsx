export default function Home() {
  return (
    <>
      <div className="homeHeader">
        <h1>Local Library Home</h1>
        <p>
          A simple bare bones library app the follows the MDN library tutorial
          but made in React.
        </p>
      </div>
      <hr />
      <div className="homeContent">
        <p>The library has the following record counts:</p>
        <ul>
          <li>
            <b>Books:</b> #NA_PLACEHOLDER
          </li>
          <li>
            <b>Copies:</b> #NA_PLACEHOLDER
          </li>
          <li>
            <b>Copies available:</b> #NA_PLACEHOLDER
          </li>
          <li>
            <b>Authors</b> #NA_PLACEHOLDER
          </li>
          <li>
            <b>Genres:</b> #NA_PLACEHOLDER
          </li>
        </ul>
      </div>
    </>
  );
}

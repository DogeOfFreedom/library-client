export default function createBookForm() {
  const statuses = ["Available", "Maintainence", "Loaned", "Reserved"];
  const books = [
    "yee yee",
    "ima finna be uhey shlaaaaag",
    "my book, no our book",
  ];

  return (
    <form action="">
      <div>
        <label htmlFor="book">Book:</label>
        <select name="book" placeholder="--Please select a book--">
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="imprint">Imprint:</label>
        <input
          type="text"
          id="imprint"
          placeholder="Publisher and date information"
        />
      </div>

      <div>
        <label htmlFor="doa">Date of availability:</label>
        <input type="date" id="doa" />
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select name="status" placeholder="--Please select a status--">
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default function createBookForm() {
  const authors = ["a", "b", "c"];
  const genres = ["sci-fi", "adventure", "existential crisis"];

  return (
    <form action="">
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" placeholder="Name of book" />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <select name="author" placeholder="--Please select an author--">
          {authors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="summary">Summary:</label>
        <textarea name="summary" id="summary" placeholder="summary"></textarea>
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input type="text" id="isbn" placeholder="ISBN13" />
      </div>
      <div>
        {genres.map((genre) => {
          return (
            <div key={genre}>
              <input type="checkbox" id={genre} value={genre} name={genre} />
              <label htmlFor="genre">{genre}</label>
            </div>
          );
        })}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

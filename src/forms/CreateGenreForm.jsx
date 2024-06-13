export default function createGenreForm() {
  return (
    <form action="">
      <div>
        <label htmlFor="genre">Genre:</label>
        <input type="text" id="genre" placeholder="Name of Genre" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

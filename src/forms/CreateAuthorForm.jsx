export default function createBookForm() {
  return (
    <form action="">
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" placeholder="First name" />
      </div>
      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" placeholder="Last name" />
      </div>
      <div>
        <label htmlFor="dob">Date of birth:</label>
        <input type="date" id="dob" />
      </div>
      <div>
        <label htmlFor="dod">Date of death:</label>
        <input type="date" id="doh" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

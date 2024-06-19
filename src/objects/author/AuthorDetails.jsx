import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingWheel from "../../LoadingWheel";
import ErrorComponent from "../../ErrorComponent";
import { convertDate, capitalize } from "../../util";

export default function AuthorDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const authorResponse = await fetch(`http://localhost:3000/author/${id}`);
      const authorObj = (await JSON.parse(await authorResponse.json()))[0];
      setAuthor(authorObj);
      setLoading(false);
    };

    try {
      fetchData();
    } catch (e) {
      setError(e);
    }
  }, []);

  if (loading) return <LoadingWheel />;
  if (error) return <ErrorComponent />;

  return (
    <>
      <h1>
        <b>Author:</b>{" "}
        {`${capitalize(author.firstname)}, ${capitalize(author.lastname)}`}
      </h1>
      <p>{`${convertDate(new Date(author.dob))} - ${convertDate(
        new Date(author.dod)
      )}`}</p>
    </>
  );
}

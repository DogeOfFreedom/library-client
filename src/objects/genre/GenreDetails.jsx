import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingWheel from "../../LoadingWheel";
import ErrorComponent from "../../ErrorComponent";
import { capitalize } from "../../util";

export default function GenreDetails() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const hostname =
        import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
      const genreResponse = await fetch(`${hostname}/genre/${id}/name`);
      const genreName = (await JSON.parse(await genreResponse.json()))[0].name;
      setGenre(genreName);
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
        <b>Genre:</b> {capitalize(genre)}
      </h1>
    </>
  );
}

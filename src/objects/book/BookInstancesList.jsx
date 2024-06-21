import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingWheel from "../../LoadingWheel";
import ErrorComponent from "../../ErrorComponent";
import object from "../object.module.css";

export default function BookInstancesList() {
  const { id } = useParams();
  const [bookInstances, setBookInstances] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const hostname =
        import.meta.env.VITE_HOST_NAME || "http://localhost:3000";
      const bookInstancesResponse = await fetch(
        `${hostname}/book_instance/get_instances/${id}`
      );
      const bookInstancesObj = await JSON.parse(
        await bookInstancesResponse.json()
      );
      setBookInstances(bookInstancesObj);

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
      <div className={object.displayContainer}>
        <h3>Copies</h3>
        {bookInstances.map((bookInstance) => {
          return (
            <div className={object.bookInstanceItem} key={bookInstance._id}>
              <hr />
              <div className={object.bookInstanceDetails}>
                <p className={bookInstance.status.toLowerCase()}>
                  {bookInstance.status}
                </p>
                <p>
                  <b>Imprint: </b> {bookInstance.imprint}
                </p>
                <p>
                  <b>Id: </b>
                  <Link to={`/catalog/book_instances/${bookInstance._id}`}>
                    {bookInstance._id}
                  </Link>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

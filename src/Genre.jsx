import { useParams } from "react-router-dom";

export default function Genre() {
  const { id } = useParams();

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function Results() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    API.get(`/elections/${id}/results/`).then((res) => setResults(res.data));
  }, [id]);

  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((r) => (
          <li key={r.id}>
            {r["user__username"]}: {r.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
}

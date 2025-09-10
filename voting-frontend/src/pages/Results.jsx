import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function Results() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get(`/elections/${id}/results/`)
      .then((res) => setResults(res.data))
      .catch((err) => {
        if (err.response && err.response.status === 403) {
          setMessage("Results are not available yet. Please check back later.");
        } else {
          setMessage("Error fetching results.");
        }
      });
  }, [id]);

  if (message) return <p className="page-message">{message}</p>;

  return (
    <div className="container">
      <h2 className="page-header">Election Results</h2>
      <ul>
        {results.map((r) => (
          <li key={r.id}>
            **{r["user__username"]}**: {r.votes} votes
          </li>
        ))}
      </ul>
    </div>
  );
}
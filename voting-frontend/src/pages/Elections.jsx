import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Elections() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    API.get("/elections/").then((res) => setElections(res.data));
  }, []);

  return (
    <div>
      <h2>Available Elections</h2>
      <ul>
        {elections.map((e) => (
          <li key={e.id}>
            {e.title}{" "}
            <Link to={`/elections/${e.id}/candidates`}>View Candidates</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

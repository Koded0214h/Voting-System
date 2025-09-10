import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function Candidates() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/elections/${id}/candidates/`).then((res) => setCandidates(res.data));
  }, [id]);

  const vote = async (candidateId) => {
    try {
      await API.post("/vote/", { candidate: candidateId });
      alert("Vote submitted!");
      navigate(`/elections/${id}/results`);
    } catch (err) {
      alert("You already voted.");
    }
  };

  return (
    <div>
      <h2>Candidates</h2>
      <ul>
        {candidates.map((c) => (
          <li key={c.id}>
            {c.user.username}{" "}
            <button onClick={() => vote(c.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

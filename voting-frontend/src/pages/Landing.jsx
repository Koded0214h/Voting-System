import { Link } from "react-router-dom";
import "./Landing.css";
import Navbar from "../components/Navbar"; // Assuming you want a different navbar for the landing page

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="landing-title">Department Voting System</h1>
        <p className="landing-subtitle">Your voice, your vote, your future.</p>
        <div className="landing-buttons">
          <Link to="/login" className="landing-button login-button">
            Login
          </Link>
          <Link to="/register" className="landing-button register-button">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
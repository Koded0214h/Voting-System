import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Elections from "./pages/Elections";
import Candidates from "./pages/Candidates";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/elections" element={<Elections />} />
          <Route path="/elections/:id/candidates" element={<Candidates />} />
          <Route path="/elections/:id/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

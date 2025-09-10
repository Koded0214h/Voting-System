import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Elections from "./pages/Elections";
import Candidates from "./pages/Candidates";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing"; // Import the new Landing page
import "./App.css"; // Import the global styles

// This component will conditionally render the Navbar
const AppWithNavbar = () => {
  const location = useLocation();
  const noNavbarPaths = ["/", "/login", "/register"];
  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} /> {/* Set Landing as the home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/elections" element={<Elections />} />
          <Route path="/elections/:id/candidates" element={<Candidates />} />
          <Route path="/elections/:id/results" element={<Results />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWithNavbar />
    </Router>
  );
}

export default App;
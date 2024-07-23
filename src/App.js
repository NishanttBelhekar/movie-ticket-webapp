import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./components/AdminPage";
import Movies from "./pages/Movies";
import SingleMovie from "./components/SingleMovie";
import SeatBookingPage from "./pages/SeatBookingPage";
import Dashboard from "./pages/Dashboard";
import { app } from "./firebase";
import Settings from "./pages/Settings";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Reset user state
        return <Navigate to="/" />;
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (user === null) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App flex flex-row items-center">
        <Dashboard />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/seat" element={<SeatBookingPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <div className="flex flex-col items-end absolute top-0 right-0 p-4">
          <span className="text-white text-sm">Signed in as: {user.email}</span>
          <button
            onClick={handleSignOut}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none"
          >
            <a href="/">Sign Out</a>
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;

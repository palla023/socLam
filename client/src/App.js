import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Register />} exact />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace={true}/> : <Login />}
            exact
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace={true}/> : <Register />}
            exact
          />
          <Route path="/profile/:username" element={<Profile />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

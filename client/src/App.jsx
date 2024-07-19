import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Homee from "./components/Homee";
import Post from "./components/Post";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (username, password) => {
    axios
      .post("https://pariwisata-community.vercel.app/login", {
        username,
        password,
      })
      .then((result) => {
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homee />}></Route>
        <Route
          path="/home"
          element={<Home token={token} onLogout={handleLogout} />}
        ></Route>
        <Route
          path="/post"
          element={<Post token={token} onLogout={handleLogout} />}
        ></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} token={token} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

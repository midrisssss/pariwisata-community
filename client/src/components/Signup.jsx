import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/register", {
        username,
        email,
        password,
      })
      .then((result) => {
        setUsername("");
        setEmail("");
        setPassword("");
        if (result.data.token) {
          navigate("/home");
        }
      })
      .catch((err) => {
        alert(err);
        setUsername("");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="w-svw h-svh bg-[url('background.png')] bg-cover flex justify-center items-center overflow-hidden">
      <div className="">
        <h1 className="text-center text-black font-bold text-4xl">Sign up</h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col justify-center items-center gap-4 my-5"
        >
          <input
            type="text"
            name="username"
            className="px-4 py-2 font-semibold rounded-2xl outline-none border-4 border-black focus:border-sky-600"
            id="name"
            placeholder="Username"
            autoComplete="on"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="email"
            className="px-4 py-2 font-semibold rounded-2xl outline-none border-4 border-black focus:border-sky-600"
            id="email"
            placeholder="Email"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            className="px-4 py-2 font-semibold rounded-2xl outline-none border-4 border-black focus:border-sky-600"
            id="password"
            placeholder="Password"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            id="submit"
            value="Sign up"
            className="px-4 py-2 w-full text-white font-semibold rounded-2xl border-black border-4 bg-black hover:bg-sky-600 hover:border-sky-600 cursor-pointer"
          />
        </form>
        <p>Already have an Account? </p>
        <Link to="/login" className="text-black hover:text-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;

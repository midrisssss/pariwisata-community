/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Login({ onLogin, token }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {token ? (
        <Navigate to="/home" />
      ) : (
        <div className="w-svw h-svh bg-[url('background.png')] bg-cover flex justify-center items-center overflow-hidden">
          <div className="">
            <h1 className="text-center text-black font-bold text-4xl">Login</h1>
            <form
              onSubmit={handleLogin}
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
                value="Login"
                className="px-4 py-2 w-full text-white font-semibold rounded-2xl border-black border-4 bg-black hover:bg-sky-600 hover:border-sky-600 cursor-pointer"
              />
            </form>
            <p>Don&lsquo;t have an Account? </p>
            <Link to="/register" className="text-black hover:text-blue-600">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;

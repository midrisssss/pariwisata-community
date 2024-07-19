/* eslint-disable react/prop-types */
import Navbar from "/src/components/Navbar";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Settings = ({ token, onLogout }) => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("tokne" + token);
    axios
      .get("https://pariwisata-community.vercel.app/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
    navigate("/login");
  };

  return (
    <>
      {token ? (
        <div className="bg-[url('mesh-91.png')] bg-cover w-svw h-svh flex flex-row justify-center items-center gap-5 p-5 pr-0">
          <Navbar active="settings" />
          <div
            id="contents"
            className="flex-1 flex-col justify-start items-center gap-20 h-svh scroll-w- overflow-y-auto snap-mandatory snap-y scroll-smooth py-8 pr-8"
          >
            <div className="flex-1 flex flex-col gap-5 bg-white rounded-2xl border-2 border-gray-300 shadow px-8 py-8 snap-center">
              <h2 className="font-semibold text-2xl">Name : {data.username}</h2>
              <h2 className="font-semibold text-2xl">Email : </h2>
              <button
                onClick={handleLogout}
                className="flex-none w-auto px-4 py-2 bg-black hover:bg-sky-600 text-center text-white font-semibold rounded"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Settings;

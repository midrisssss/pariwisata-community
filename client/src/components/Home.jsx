/* eslint-disable react/prop-types */
import { Navigate, useSearchParams } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Content from "/src/components/Content";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Home = ({ token, onLogout}) => {
  const [datas, setDatas] = useState([]);
  const [pages, setPages] = useState(20);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("post")) {
      const fetchData = async () => {
        await axios
          .get(
            `https://pariwisata-community.vercel.app/post/${searchParams.get("post")}?pages=${pages}`
          )
          .then((res) => {
            setDatas([...res.data]);
          })
          .catch((err) => console.log(err));
      };
      fetchData();
    } else {
      const fetchData = async () => {
        await axios
          .get(`http://localhost:5000/posts?pages=${pages}`)
          .then((res) => {
            setDatas([...res.data]);
          })
          .catch((err) => console.log(err));
      };
      fetchData();
    }
  }, [pages]);

  const handleGetPosts = (e) => {
    e.preventDefault();
    setPages((prev) => (prev += 20));
  };

  const handleShare = (e) => {
    const currentUrl = `https://pariwisata-community.vercel.app/home?post=${e.currentTarget.id}`;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        Swal.fire({
          title: "Link Copied",
          text: "",
          icon: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {localStorage.getItem("token") || token ? (
        <div className="bg-[url('mesh-91.png')] bg-cover w-svw h-svh flex flex-row justify-center items-center gap-5 p-5 pr-0 overflow-hidden">
          <Navbar active="home" token={token} onLogout={onLogout} />
          <div
            id="contents"
            className="flex flex-col justify-start items-center gap-20 h-svh overflow-y-auto snap-mandatory snap-y scroll-smooth py-8 pr-8"
          >
            {datas.map((data) => (
              <Content key={data._id} data={data} onShare={handleShare} />
            ))}
            {pages > datas.length ? (
              <p className="text-lg font-semibold text-white">
                There are no lago posts
              </p>
            ) : (
              <button
                onClick={handleGetPosts}
                className="px-4 py-2 font-semibold bg-black text-white hover:bg-sky-600 rounded"
              >
                See More Posts
              </button>
            )}
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Home;

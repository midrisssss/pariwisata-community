/* eslint-disable react/prop-types */
import Navbar from "/src/components/Navbar";
import { useNavigate, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";

function Post({ token, onLogout }) {
  const [title, setTitle] = useState("Title");
  const [location, setLocation] = useState("Location");
  const [description, setDescription] = useState("Description...");
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("description", description);

    try {
      await axios
        .post("https://pariwisata-community.vercel.app/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        })
        .then((res) => {
          Swal.fire({
            title: res.data.message,
            icon: "success"
          });
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {token ? (
        <div className="bg-[url('mesh-91.png')] bg-cover w-svw h-svh flex flex-row justify-center items-center gap-5 p-5 overflow-hidden">
          <Navbar active="post" token={token} onLogout={onLogout} />
          <div className="flex-auto bg-white rounded-2xl border-2 border-gray-300 shadow px-8 py-8 overflow-auto max-h-svh">
            <form
              method="post"
              encType="multipart/form-data"
              className="flex flex-col md:flex-row justify-between items-center gap-10 mt-5"
              onSubmit={handleSubmit}
            >
              <div
                id="image"
                className="bg-[url('mesh-91.png')] relative flex-none rounded-2xl aspect-auto w-full md:w-1/2 h-full overflow-hidden"
              >
                <img src="mesh-91.png" alt="" />
                <input
                  type="file"
                  name="image"
                  id="inputImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="cursor-pointer absolute top-0 left-0 z-0 w-full h-full"
                />
              </div>
              <div className="flex-none w-full md:w-1/3 flex flex-col justify-center items-start gap-5">
                <input
                  type="text"
                  name="title"
                  className="font-bold text-2xl px-4 py-2 border-4 border-black focus:border-sky-600 outline-none rounded-2xl w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  name="title"
                  className="font-bold text-2xl px-4 py-2 border-4 border-black focus:border-sky-600 outline-none rounded-2xl w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <textarea
                  name="description"
                  rows="30"
                  cols="40"
                  value={description}
                  className="font-semibold text-lg max-h-40 md:max-h-64  px-4 py-2 w-full overflow-y-auto border-4 border-black focus:border-sky-600 outline-none rounded-2xl"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                >
                  {description}
                </textarea>
                <input
                  type="submit"
                  name="submit"
                  value="Upload"
                  className="font-bold text-2xl px-4 py-2 text-white text-center bg-black border-4 border-black hover:border-sky-600 hover:bg-sky-600 outline-none rounded-2xl w-full cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}

export default Post;

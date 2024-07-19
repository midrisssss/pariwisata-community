/* eslint-disable react/prop-types */
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function Content({ onShare, data }) {
  const [likeCount, setLikeCount] = useState(data.like);
  const [isLike, setIsLike] = useState(false);

  const handleLike = (e) => {
    setIsLike((prev) => !prev);
    if (!isLike) {
      e.target.src = "/heart.svg";
      setLikeCount((prev) => (prev += 1));
      axios
        .post(`http://localhost:5000/post/${data._id}?like=${isLike}`)
        .then((res) => {
          Swal.fire({
            title: res.message,
            text: "",
            icon: "success",
          });
        })
        .catch((err) => console.log(err));
    } else {
      e.target.src = "/heart-outline.svg";
      setLikeCount((prev) => (prev -= 1));
      axios.post(
        `http://localhost:5000/post/${data._id}?like=${isLike}`
      );
    }
  };

  return (
    <div className="flex-auto bg-white rounded-2xl border-2 border-gray-300 shadow px-8 py-8 snap-center">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mt-5">
        <div className="flex-none rounded-2xl aspect-auto w-full md:w-1/2 h-full overflow-hidden">
          <img
            src={`http://localhost:5000/${data.img}`}
            alt={data.img}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-none w-full md:w-1/3 flex flex-col justify-center items-start gap-5">
          <h1 className="font-bold text-2xl">{data.title}</h1>
          <p className="font-semibold text-lg max-h-40 md:max-h-96 w-auto overflow-y-auto">
            {data.description}
          </p>
        </div>
        <div className="flex-none w-auto h-full md:w-14 flex justify-center items-center border-gray-500 rounded-full border-2 px-4 md:px-3 py-3 md:py-4">
          <ul className="flex flex-row md:flex-col justify-center items-center gap-5">
            <li>
              <button onClick={handleLike}>
                <figure>
                  <img src="/heart-outline.svg" alt="" className="max-w-8" />
                  <figcaption>{likeCount}</figcaption>
                </figure>
              </button>
            </li>
            <li>
              <button id={data._id} onClick={onShare}>
                <img src="/share.svg" alt="" className="max-w-8" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Content;

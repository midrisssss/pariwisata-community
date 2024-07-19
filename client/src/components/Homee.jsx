/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

function Homee() {
  return (
    <div className="scroll-smooth">
      <div className="bg-[url('background.png')] bg-cover px-10 py-20 gap-5 flex flex-col justify-center items-center h-svh">
        <h1 className="text-center font-extrabold text-6xl">
          Explore the Hidden Gems of Indonesia with Our Vibrant Travel
          Community!
        </h1>
        <Link
          to="/register"
          className="py-3 px-5 bg-black hover:bg-blue-600 rounded-2xl font-bold text-white"
        >
          Get Started
        </Link>
      </div>
      <div className="px-10 py-20 gap-5 flex flex-col justify-center items-center h-svh">
        <h1 className="text-center font-extrabold text-6xl">
          Welcome to Wisata Community
        </h1>
        <p className="text-lg">
          At Komunitas Wisata, we believe that travel is more than just visiting
          new places—it's about connecting with people, discovering hidden gems,
          and creating unforgettable memories. Our mission is to bridge the gap
          between travelers and local communities across Indonesia, making it
          easier for you to explore and experience the richness of our diverse
          culture and stunning landscapes
        </p>
      </div>
      <div className="flex justify-center items-center"><p>&copy;Copyright by Wisata Community</p></div>
    </div>
  );
}

export default Homee;

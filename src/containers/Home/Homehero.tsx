import { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const HomeHero = () => {
  const [media, setMedia] = useState({
    img: "https://ik.imagekit.io/varsh0506/Internship/instagram.png?updatedAt=1726943292562",
    name: "Instagram",
  });

  return (
    <div
      className="flex flex-col items-center justify-center mx-auto 2xl:container gap-y-10 text-white"
      id="hero"
      style={{
        background: "linear-gradient(135deg, #A940D0, #2F289C, #8E3278)",
      }}
    >
      {/* Logo */}
      <div className="flex justify-between w-[100%]">
        <p className="text-black mt-5 mx-5 text-2xl font-bold">BigLinkz</p>
        <div>
          <button className="text-lg font-semibold text-white bg-black rounded-3xl p-2 px-5 m-5 hover:shadow-xl">
            <Link to="/login">Login</Link>
          </button>
          <button className="text-lg font-semibold text-white bg-black rounded-3xl p-2 px-5 m-5 hover:shadow-xl">
            <Link to="/signup">SignUp</Link>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="flex items-center justify-center mt-5">
        <h1 className="text-5xl leading-[70px] font-bold text-center w-[70%]">
          Automate Your{" "}
          <span className="text-black">Influencer Marketing:</span> From
          Influencer Selection to Budget Calculation and Outreach
        </h1>
      </div>

      {/* Description */}
      <div className="flex items-center justify-center">
        <p className="text-center w-[70%] text-lg text-white">
          With Biglinkz, automate influencer-brand collaborations, streamline
          outreach, and manage campaigns effortlessly. Focus on creating while
          we handle{" "}
          <span className="text-black">
            the connections, budget calculations, and performance tracking
          </span>{" "}
          for maximum reach and results.
        </p>
      </div>

      {/* Dropdown and Search */}
      <div className="md:flex items-start justify-between p-3 border border-white rounded-xl w-[60%] hidden text-white mb-10">
        <div className="w-10 h-10 overflow-hidden inline-block">
          <img
            src="https://ik.imagekit.io/varsh0506/Internship/instagram.png?updatedAt=1726943292562"
            alt="Instagram Icon"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="hidden mt-2 md:flex">
          <input
            placeholder="Start by Searching . . ."
            className="text-white bg-transparent  w-full focus:outline-none"
          />
        </div>
        <div>
          <button className="px-3 py-2 text-center text-white bg-[#5151d6] rounded-3xl">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

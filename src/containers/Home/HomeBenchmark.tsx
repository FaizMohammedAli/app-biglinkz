import React from "react";
import NorthEastIcon from "@mui/icons-material/NorthEast";
const Benchmark = () => {
  return (
    <div className="mx-auto 2xl:container">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 p-[20px] mt-10 pl-10 rounded-xl gap-10">
        <div className="flex flex-col items-center justify-center gap-y-7 border-[3px] p-5 rounded-xl bg-gradient-to-r from-[#6B65C7] to-[#A940D0] text-white">
          <div>
            <p className="font-sans text-3xl font-bold leading-30 text-black">
              Assess Your Standing in the Market
            </p>
          </div>
          <div>
            <p className="text-lg text-white leading-50">
              With Biglinkz, you can thoroughly evaluate your market standing
              and gain essential insights into industry trends. This empowers
              you to make informed decisions that drive growth, enhance your
              brand's influence, and effectively connect with the right
              influencers for your campaigns.
            </p>
          </div>
          <div>
            <button className="md:flex items-center justify-center font-semibold text-white bg-[#2F289C] hover:bg-[#3f3fa8] rounded-xl h-[50px] p-2 hidden">
              Request a Demo
              <span>{<NorthEastIcon />}</span>
            </button>
          </div>
        </div>
        <div>
          <video
            width="500"
            height="500"
            autoPlay
            loop
            muted
            className="slit-in-vertical"
          >
            <source
              src="https://ik.imagekit.io/varsh0506/Internship/Untitled%20design.mp4?updatedAt=1727418004608"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};
export default Benchmark;

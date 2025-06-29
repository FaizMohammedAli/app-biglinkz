import { useState } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import PaidIcon from "@mui/icons-material/Paid";
import ForumIcon from "@mui/icons-material/Forum";

const Working = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (buttonIndex: number) => {
    if (buttonIndex === selectedButton) {
      return;
    }
    setSelectedButton(buttonIndex);
  };

  return (
    <div className="2xl:container mx-auto mt-10">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-4xl w-[90%]">
          What Makes Us Unique: Key Features
        </h1>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1  p-4 w-[80%] mx-auto mt-20 gap-10">
        <div className="space-y-4">
          {/* Button 1 */}
          <div className="space-y-2">
            <button
              className={`font-semibold text-2xl focus:bg-[#A940D0] focus:shadow-xl focus:shadow-[#A940D0] bg-[#2F289C] text-white p-2 rounded transition-transform duration-300 hover:scale-105 w-[100%] mb-8 ${
                selectedButton === 1 ? "bg-[#2F289C] shadow-xl" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
              <div className="flex gap-3 justify-center items-center">
                <span>{<GroupsIcon />}</span>
                Discover Your Ideal Influencers
              </div>
            </button>
            {/* Smooth sliding transition */}
            <div
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                selectedButton === 1 ? "max-h-60" : "max-h-0"
              }`}
            >
              <p className="p-2 text-xl">
                Unlock a world of possibilities by easily finding influencers
                who resonate with your brand’s values and target audience.
                Simply input your campaign requirements, and Biglinkz will
                generate a curated list tailored to your specific needs.
              </p>
            </div>
          </div>

          {/* Button 2 */}
          <div className="space-y-2 ">
            <button
              className={`font-semibold text-2xl w-[100%] mb-8 focus:bg-[#A940D0] focus:shadow-xl focus:shadow-[#A940D0] bg-[#2F289C] text-white p-2 rounded transition-transform duration-300 hover:scale-105 ${
                selectedButton === 2 ? "bg-[#2F289C] shadow-xl" : ""
              }`}
              onClick={() => handleButtonClick(2)}
            >
              <div className="flex gap-3 justify-center items-center">
                <span>{<PaidIcon />}</span>
                Automate Your Budgeting
              </div>
            </button>
            <div
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                selectedButton === 2 ? "max-h-60" : "max-h-0"
              }`}
            >
              <p className="p-2 text-xl">
                Say goodbye to tedious manual calculations! Biglinkz
                automatically computes a standardized budget based on each
                selected influencer's follower rates and engagement metrics.
                This ensures you stay within budget while maximizing campaign
                effectiveness.
              </p>
            </div>
          </div>

          {/* Button 3 */}
          <div className="space-y-2">
            <button
              className={`font-semibold text-2xl w-[100%] mb-8 focus:bg-[#A940D0] focus:shadow-xl focus:shadow-[#A940D0] bg-[#2F289C] text-white p-2 rounded transition-transform duration-300 hover:scale-105 ${
                selectedButton === 3 ? "bg-[#2F289C] shadow-xl" : ""
              }`}
              onClick={() => handleButtonClick(3)}
            >
              <div className="flex gap-3 justify-center items-center">
                <span>{<ForumIcon />}</span>
                Effortlessly Manage Outreach
              </div>
            </button>
            <div
              className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
                selectedButton === 3 ? "max-h-60" : "max-h-0"
              }`}
            >
              <p className="p-2 text-xl">
                Streamline your outreach efforts with Biglinkz! After selecting
                your influencers, our platform automates the process of sending
                personalized direct messages. This saves you time and ensures
                that your outreach is consistent and efficient.
              </p>
            </div>
          </div>
        </div>

        {/* Second Grid - Image */}
        <div className="md:flex justify-center items-center hidden">
          {selectedButton === 1 && (
            <video
              width="500"
              height="500"
              autoPlay
              loop
              muted
              className="slit-in-vertical"
            >
              <source
                src="https://ik.imagekit.io/varsh0506/Internship/White%20Simple%20New%20Arrival%20Month%20Collection%20Shop%20Now%20Instagram%20Post.mp4?updatedAt=1727202885205"
                type="video/mp4"
              />
            </video>
          )}
          {selectedButton === 2 && (
            <video
              width="500"
              height="500"
              autoPlay
              loop
              muted
              className="slit-in-vertical h-[500px] mb-10"
            >
              <source
                src="https://ik.imagekit.io/zcdsz07ad/BigLinkz/Untitled%20design%20(1).mp4?updatedAt=1727674309897"
                type="video/mp4"
              />
            </video>
          )}
          {selectedButton === 3 && (
            <video
              width="500"
              height="500"
              autoPlay
              loop
              muted
              className="slit-in-vertical h-[500px] mb-10"
            >
              <source
                src="https://ik.imagekit.io/zcdsz07ad/BigLinkz/Untitled%20design%20(2).mp4?updatedAt=1727674371179"
                type="video/mp4"
              />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default Working;

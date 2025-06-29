import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";

const Workspace = () => {
  return (
    <div className="mx-auto bg-gradient-to-r from-[#6B65C7] to-[#D86AB3] 2xl:container ">
      <div className="w-[80%] mx-auto flex justify-center items-center p-[30px] pl-10 rounded-xl flex-col gap-y-6">
        <div className="flex items-center justify-center">
          <h2 className="text-5xl font-bold w-[80%] mt-5 text-center pt-10">
            One Workspace for All Your Influencer Marketing Campaigns
          </h2>
        </div>
        <div>
          <p className="text-gray-800">
            Time for you to leverage influencer intelligence platform and launch
            your influencer marketing campaigns.
          </p>
        </div>
        <div>
          <button className="flex gap-2 p-3 font-semibold text-white bg-[#2F289C] hover:bg-[#1E1A67] rounded-xl">
            Request For Demo
            <span>{<ArrowOutwardIcon />}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 mt-5 md:grid-cols-2 gap-7">
          <div className="flex border border-[#2F289C] hover:shadow-2xl rounded-3xl hover:border-[#1E1A67] hover:drop-shadow-xl">
            <button className="m-6">
              <div className="flex flex-col">
                <div className="flex justify-start">
                  <p className="mb-3 text-2xl font-semibold">
                    Influencer <span>{<GroupsIcon />}</span>
                  </p>
                </div>
                <div className="">
                  <p className="text-gray-800">
                    Connect with the right brands that resonate with your values
                    and audience, allowing you to elevate your influence and
                    create impactful partnerships that drive engagement and
                    growth.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-[#2F289C] material-symbols-outlined">
                  {<ArrowOutwardIcon />}
                </span>
              </div>
            </button>
          </div>
          <div className="flex border border-[#2F289C] rounded-3xl hover:border-[#1E1A67] hover:shadow-2xl hover:drop-shadow-xl">
            <button className="m-6">
              <div className="flex flex-col">
                <div className="flex justify-start">
                  <p className="mb-3 text-2xl font-semibold">
                    Brands <span>{<ApartmentIcon />}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-800">
                    Partner with authentic influencers who align with your
                    brand's vision and goals, ensuring impactful campaigns that
                    resonate with your target audience and drive meaningful
                    engagement.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-[#2F289C] material-symbols-outlined">
                  {<ArrowOutwardIcon />}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

import React from "react";
const Strategy = () => {
  return (
    <div className="py-12 mx-auto text-center 2xl:container bg-white mt-10">
      <h2 className="mb-8 text-4xl font-bold">
        Comprehensive Solutions from Planning to Analysis
      </h2>
      <div className="w-[90%] mx-auto grid md:grid-cols-3 gap-12 text-left">
        <div className="flex flex-col p-6 rounded-lg border border-[#A940D0] hover:shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              src="https://ik.imagekit.io/varsh0506/Internship/budget.png?updatedAt=1727034847785"
              className="h-20"
            />
            <h3 className="mb-2 text-xl font-semibold text-center text-[#2F289C]">
              Budget with Confidence and Precision
            </h3>
          </div>
          <p className="text-center">
            Allocate your influencer marketing budget wisely. Discover
            influencer costs, assess their value, and predict your potential
            reach to make informed financial choices for your campaigns.
          </p>
        </div>
        <div className="flex flex-col p-6 rounded-lg border border-[#A940D0] hover:shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              src="https://ik.imagekit.io/varsh0506/Internship/fast.png?updatedAt=1727034881956"
              alt="icon 2"
              className="h-20"
            />
            <h3 className="mb-2 text-xl font-semibold text-center text-[#2F289C]">
              Enhance Influencer Effectiveness with Insights
            </h3>
          </div>
          <p className="text-center">
            Boost your campaign ROI by identifying the ideal influencers for
            your brand and target audience. Strategically plan and execute your
            next campaign using actionable performance metrics.
          </p>
        </div>
        <div className="flex flex-col p-6 rounded-lg border border-[#A940D0] hover:shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              src="https://ik.imagekit.io/varsh0506/Internship/optimization.png?updatedAt=1727034951067"
              alt="icon 3"
              className="h-20"
            />
            <h3 className="mb-2 text-xl font-semibold text-center text-[#2F289C]">
              Stay Agile with Influencer Marketing Trends
            </h3>
          </div>
          <p className="text-center">
            Refine your campaign strategy using up-to-date trends and insights.
            Tailor your approach to align with market movements and the
            strategies of brands similar to yours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Strategy;

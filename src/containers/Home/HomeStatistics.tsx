import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Slider = () => {
  const carouselData = [
    {
      aspect: "Influencer Discovery",
      before: {
        value: "68%",
        description:
          "of brands reported that finding the right influencers manually is time-consuming and inefficient",
      },
      after: {
        value: "60%",
        description:
          "of time spent for influencer finding is reduced by Automation",
      },
    },
    {
      aspect: "Streamlined Communication",
      before: {
        value: "57%",
        description:
          "of brands struggled with maintaining consistent messaging across different influencers, leading to fragmented brand identity",
      },
      after: {
        value: "40%",
        description:
          "improvement in influencer response rates is achieved as Biglinkz automates outreach with personalized templates and organized communication, ensuring clear and effective messaging.",
      },
    },
    {
      aspect: "Data-Driven Budgeting",
      before: {
        value: "52%",
        description:
          "of marketers found budget estimation a challenge, leading to overspending or inefficient allocations.",
      },
      after: {
        value: "25%",
        description:
          "savings on budget mismanagement is achieved through Biglinkz’s automated budget calculation, which uses historical data to predict costs accurately and maximize campaign reach.",
      },
    },
  ];

  return (
    <div className="carousel-container w-[90%] mx-auto my-8 text-center">
      <h2 className="text-2xl font-bold mb-6">
        How Biglinkz Outperforms Traditional Approaches
      </h2>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
        autoPlay={true}
        interval={7000}
        transitionTime={500}
        showStatus={false}
        stopOnHover={true}
        ariaLabel="Before and After Statistics Carousel"
      >
        {carouselData.map((item, index) => (
          <div
            className="slide-content p-4 bg-gradient-to-r from-[#6B65C7] to-[#A940D0] rounded-lg shadow-md"
            key={index}
          >
            <h3 className="text-lg font-semibold mb-4">{item.aspect}</h3>
            <div className="flex justify-around items-start gap-6">
              <div className="before w-[45%] bg-white p-4 rounded-md shadow flex flex-col items-center justify-center">
                <h4 className="text-xl font-medium mb-2 text-gray-700">
                  Before
                </h4>
                <p className="text-4xl font-bold text-purple-600 mb-2">
                  {item.before.value}
                </p>
                <p className="text-sm text-gray-500 text-center">
                  {item.before.description}
                </p>
              </div>
              <div className="after w-[45%] bg-white p-4 rounded-md shadow flex flex-col items-center justify-center">
                <h4 className="text-xl font-medium mb-2 text-gray-700">
                  After
                </h4>
                <p className="text-4xl font-bold text-purple-600 mb-2">
                  {item.after.value}
                </p>
                <p className="text-sm text-gray-500 text-center">
                  {item.after.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;

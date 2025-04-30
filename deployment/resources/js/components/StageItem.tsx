import React from "react";
import Lottie from "lottie-react";
import Explore from "../assets/lottie-explore.json";
import Build from "../assets/lottie-build.json";
import Grow from "../assets/lottie-grow.json";

const StageItem = ({ animationData, title, description }: any) => {
  return (
    <div className="flex justify-start md:justify-center">
      <div className="shrink-0 size-24 md:size-40">
        <Lottie className="block" animationData={animationData} />
      </div>
      <div className="pl-6 md:pl-12">
        <h2 className="text-3xl font-medium leading-[1.08] text-white md:text-4xl">
          {title}
        </h2>
        <div className="mt-6 font-light text-white">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

const StageItems = () => {
  const stagesData = [
    {
      animationData: Explore,
      title: "Explore",
      description:
        "We take the time to understand the context so decisions can be made from a place of evidence rather than assumption.",
    },
    {
      animationData: Build,
      title: "Build",
      description:
        "We bring together a select group of specialists from our team to suit your particular challenges so that your project has exactly the right resources at the right moments.",
    },
    {
      animationData: Grow,
      title: "Grow",
      description:
        "Our deeply integrated Strategy, UX, Design and Technology teams will work closely together to ensure that your digital assets continue to evolve and deliver a return on your investment.",
    },
  ];

  return (
    <div>
      {stagesData.map((stage, index) => (
        <StageItem
          key={index}
          animationData={stage.animationData}
          title={stage.title}
          description={stage.description}
        />
      ))}
    </div>
  );
};

export default StageItems;


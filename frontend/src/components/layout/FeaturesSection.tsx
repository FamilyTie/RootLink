import FeatureCard from "../ui/FeatureCard";

const features = [
  {
    number: "1",
    title: "Discover",
    description:
      "Our platform uses advanced machine learning to analyze profiles, using details like background information and personal bios to find potential matches with high accuracy. Whether you’re searching for close relatives or distant ancestors, RootLink simplifies and streamlines the discovery process.",
  },
  {
    number: "2",
    title: "Connect",
    description: `Your Privacy and Security Come First: RootLink protects every interaction with top-tier security, ensuring you can connect safely on your terms. Control your sharing and connect confidently:
      \n Private Messaging: Safely contact potential family members without exposing personal contact details.
      - Data Protection: Our stringent privacy policies keep your information secure and confidential as you build connections.`,
  },
  {
    number: "3",
    title: "Share",
    description: `RootLink is more than a tool for finding relatives; it’s a community where you can share and grow. Our features enable you to:
      Share Your Journey: Post your family discovery stories to inspire and encourage others
      - Learn and Advise: Engage with posts for insights or offer advice, whether it’s practical tips or emotional support.`,
  },
];
function FeaturesSection() {
  return (
    <div className="h-[110vh] mt-10  back-blue1">
      <div className="relative pl-[17rem] flex flex-col items-center  py-[5rem]">
        <h1 className="text-[50px] text-[#074979]  ">Features</h1>
        <h2 className="text-[65px] font-semibold  pl-[20rem] mb-16">
          How it Works
        </h2>
      </div>
      <div className="ml-[2rem] scale-[0.9]  relative top-[-25rem] ">
        <div className="flex w-full ">
          <div>
            <FeatureCard feature={features[0]} />
            <div className="w-[23px] h-[76px] grad-blue2  ml-[35%]"></div>
            <div className="flex">
              <FeatureCard feature={features[1]} />
              <div className="w-[250px] h-[23px] grad-blue2 m-auto"></div>
            </div>
          </div>

          <div className="w-[100%] self-end flex justify-between  py-[5rem]">
            <FeatureCard feature={features[2]} />
          </div>
        </div>
        <p className="text-center text-[25px] mt-10">&copy; 2024 RootLink</p>
      </div>
      
    </div>
  );
}

export default FeaturesSection;

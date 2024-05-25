import FeatureCard from "./FeatureCard"
import { FeatureSectionProps } from "../../../../interfaces";


function FeaturesSection({features} : FeatureSectionProps) {
  return (
    <section className="h-[110vh] mt-10  back-blue1">
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
      
    </section>
  );
}

export default FeaturesSection;

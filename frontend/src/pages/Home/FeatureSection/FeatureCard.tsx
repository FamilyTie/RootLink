import { Feature } from "../../../../Interfaces&Types/types";
import { FeatureCardProps } from "../../../../Interfaces&Types/interfaces";

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="w-[555px] card-shadow bg-white p-12">
      <div className="text-[50px] bg-[#0A69AE] bg-opacity-[30%] text-[#074979 ] w-[4rem] h-[4rem]   text-center ">
        <p className=" text-[#074979] translate-y-[-10px] font-semibold">
          {feature.number}
        </p>
      </div>
      <h2 className="text-[45px]  font-semibold">{feature.title}</h2>
      <p className="text-[20px]">{feature.description}</p>
    </div>
  );
}

export default FeatureCard;

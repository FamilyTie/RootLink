import { Link } from "react-router-dom";
import SignUpFormValidation from "../authentication/signUpForm";




export default function signUpPage() {
  return (
    <>
      <div className="overflow-hidden h-screen relative">
        <div className="absolute w-full flex align-center font-semibold text-[30px] p-10 px-[6rem] z-[20]">
          <p>RootLink</p>
          <img className="w-[26.15px] h-[32.33px] self-center" src="/tree2.png" alt="Tree" />
        </div>
        {/* White Background (Base Layer) */}
        <div className="absolute bg-white z-[1] w-screen h-screen"></div>

        {/* Image Layer */}
        <img className="absolute opacity-[20%] z-[2] w-[995px]" src="/image.png" alt="Background" />

        {/* Blue Gradient Layer */}
        <div className="absolute bg-gradient-to-b z-[3] from-[#A0D9FF] to-white h-full w-screen opacity-[85%]"></div>
        <li>
          <SignUpFormValidation />
        </li>
        <p className="z-[5] absolute left-[27%] bottom-[3.5rem] text-[32px] font-medium">
          Take the First Step: Bringing Families Closer, One Connection at a Time!
        </p>
      </div>
      <Link to="/login">Go back to login</Link>
    </>
  );
}
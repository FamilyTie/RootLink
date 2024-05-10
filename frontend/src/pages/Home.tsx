export default function HomePage() {
  return (
    <>
      <nav className="flex px-[8%] pt-[1.5rem] justify-between">
        <div className="flex gap-1 ">
          <h3 className="text-[36px] font-semibold">RootLink</h3>

          <img
            className="w-[30.15px] h-[36.33px] self-center"
            src="/tree2.png"
            alt="tree"
          />
        </div>

        <div>
          <ul className="flex text-[32px] gap-4">
            <li className="grad-blue1 ">Home</li>
            <li>Sign-In</li>
          </ul>
        </div>
      </nav>
      <div className="px-[8%]">
        <div className="flex ">
          <div>
          <h1 className="w-[700px] text-[100px] pt-[5rem] leading-none">
          {" "}
          Reconnect With Your <span className="grad-blue1">Roots</span>
        </h1>
        <p className="w-[75%] text-[25px] pt-10">
          Explore the Journey of Reunion. RootLink empowers individuals to
          uncover the missing pieces of their family puzzle, offering hope,
          support, and a pathway to reconnect with lost loved ones.
        </p>
        <button className="w-[170px] text-white mt-8  text-[20px] grad-blue2  h-[55px]">Start Your Journey</button>
          </div>
          <img
          className=" mt-[7rem] translate-x-[-15rem] w-[834px]"
          src="/father-son.png"
        ></img>
        </div>
        
        
        
      </div>
      <p>Put something interesting here!!</p>
    </>
  );
}

// /* Home */

// position: absolute;
// width: 70px;
// height: 43px;
// left: 1161px;
// top: 22px;

// font-family: 'Darker Grotesque';
// font-style: normal;
// font-weight: 600;
// font-size: 32px;
// line-height: 43px;

// background: radial-gradient(50% 50% at 50% 50%, #0A69AE 0%, #0A69AE 50%, #042B48 100%);
// -webkit-background-clip: text;
// -webkit-text-fill-color: transparent;
// background-clip: text;
// text-fill-color: transparent;

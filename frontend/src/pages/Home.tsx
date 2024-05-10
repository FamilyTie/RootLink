export default function HomePage() {
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
  return (
    <div className="overflow-hidden">
      <nav className="flex px-[8%] pt-[1.5rem] justify-between">
        <div className="flex gap-1 ">
          <h3 className="text-[30px] font-semibold">RootLink</h3>

          <img className="w-[25px] self-center" src="/tree2.png" alt="tree" />
        </div>

        <div>
          <ul className="flex text-[28px] gap-4">
            <li className="grad-blue1 font-semibold ">Home</li>
            <li>Sign-In</li>
          </ul>
        </div>
      </nav>
      <div className="px-[8%] ">
        <div className="flex ">
          <div>
            <h1 className="w-[700px] text-shadow text-[110px] pt-[6rem] leading-none">
              {" "}
              Reconnect With Your <span className="grad-blue1">Roots</span>
            </h1>
            <p className="w-[75%]  text-[25px] pt-10">
              Explore the Journey of Reunion. RootLink empowers individuals to
              uncover the missing pieces of their family puzzle, offering hope,
              support, and a pathway to reconnect with lost loved ones.
            </p>
            <button className=" box-shadow_custom w-[180px] text-white mt-8  text-[20px] bg-[#0A69AE]  h-[55px]">
              Start Your Journey
            </button>
          </div>
          <img
            className=" mt-[7rem] translate-x-[-15rem] w-[834px]"
            src="/father-son.png"
          ></img>
        </div>
      </div>

      <div className="h-screen mt-10 back-blue1">
        <div className="relative pl-[17rem] flex flex-col items-center  py-[5rem]">
          <h1 className="text-[50px] grad-blue1   ">Features</h1>
          <h2 className="text-[65px] font-semibold  pl-[20rem] mb-16">
            How it Works
          </h2>
        </div>
        <div className="ml-[2rem] scale-[0.9]  relative top-[-25rem] ">
        <div className="flex w-full ">
          <div >
            <div className="w-[555px] card-shadow bg-white p-10 flex flex-col ">
              <div className="text-[50px] bg-[#0A69AE] bg-opacity-[30%] text-[#0A69AE] w-[4rem] h-[4rem]   text-center "><p className="translate-y-[-10px] font-semibold">1</p></div>
              <h2 className="text-[45px] font-semibold">{features[0].title}</h2>
              <p className="text-[20px]">{features[0].description}</p>
            </div>
              <div className="w-[23px] h-[76px] grad-blue2  ml-[35%]"></div>
              <div className="flex">
              <div className="w-[555px] f card-shadow bg-white p-11 flex flex-col ">
            <div className="text-[50px] bg-[#0A69AE] bg-opacity-[30%] text-[#0A69AE] w-[4rem] h-[4rem]   text-center "><p className="translate-y-[-10px] font-semibold">2</p></div>
              <h2 className="text-[45px] font-semibold">{features[1].title}</h2>
              <p className="text-[20px]">{features[1].description}</p>
            </div>
            <div className="w-[250px] h-[23px] grad-blue2 m-auto"></div>
              </div>
           
          </div>

          <div className="w-[100%] self-end flex justify-between  py-[5rem]">
        
              <div className="w-[555px] card-shadow bg-white p-12">
              <div className="text-[50px] bg-[#0A69AE] bg-opacity-[30%] text-[#0A69AE] w-[4rem] h-[4rem]   text-center "><p className="translate-y-[-10px] font-semibold">3</p></div>
                <h2 className="text-[45px] font-semibold">{features[2].title}</h2>
                <p className="text-[20px]">{features[2].description}</p>
              </div>
    
          </div>
        </div>
      </div>
      </div>

      
    </div>
  );
}

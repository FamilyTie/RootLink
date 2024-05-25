function HeroSection() {
  return (
    <section className="px-[8%] ">
      <div className="flex ">
        <div>
          <h1 className="w-[700px] text-[#074979]  text-shadow text-[110px]  pt-[6rem] leading-none">
            Reconnect With Your <span className="grad-blue1  ">Roots</span>
          </h1>
          <p className="w-[75%]  text-[25px] pt-10">
            Explore the Journey of Reunion. RootLink empowers individuals to
            uncover the missing pieces of their family puzzle, offering hope,
            support, and a pathway to reconnect with lost loved ones.
          </p>
          <button className="   font-medium box-shadow_custom w-[180px] text-white mt-8  text-[20px] bg-[#074979]   h-[55px]">
            Start Your Journey
          </button>
        </div>
        <img
          className=" mt-[7rem] translate-x-[-15rem] w-[834px]"
          src="/father-son.png"
        ></img>
      </div>
    </section>
  );
}

export default HeroSection;

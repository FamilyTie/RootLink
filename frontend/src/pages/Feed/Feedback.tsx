

function Feedback() {
  return (
    <div className="flex justify-between px-5 bg-white rounded py-4 mt-5 w-[24rem]">
              <div>
                <h1 className="text-[20px] font-semibold">
                  Feature Suggestions?
                </h1>
                <p className="w-[10rem]">
                  Help us solve our mission by providing feedback!
                </p>
              </div>
              <img
                className="w-[4rem] h-[4.5rem] align-middle my-auto"
                src="/code.png"
              ></img>
            </div>
  )
}

export default Feedback
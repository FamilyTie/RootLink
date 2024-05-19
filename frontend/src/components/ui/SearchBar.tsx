

function SearchBar({big=false}) {
  return (
    <div>
         <div className=" m-auto  relative">
          <img
            className="absolute w-[1.2rem] left-[6rem] top-[9px] "
            src="/search.png"
          ></img>
          <input
            placeholder="Search something here..."
            className={ `pb-1 pl-12 text-[1.3rem] placeholder:text-gray-300 text-[#9DADB8] font-medium  m-auto ml-[5rem] w-[22rem]  ${big? "": " h-[2.2rem]" }  rounded  border-[2px] `}
          ></input>
        </div>
    </div>
  )
}

export default SearchBar
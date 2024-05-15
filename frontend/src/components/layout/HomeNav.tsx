function HomeNav() {
  return (
    <nav className="flex px-[8%] pt-[1.5rem] justify-between">
      <div className="flex gap-1 ">
        <h3 className="text-[30px] font-semibold">RootLink</h3>

        <img className="w-[25px] self-center" src="/tree2.png" alt="tree" />
      </div>

      <div>
        <ul className="flex text-[28px] gap-4">
          <li className="text-[#074979] font-semibold ">Home</li>
          <li><a className="text-black" href="/login">Sign-In</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default HomeNav;

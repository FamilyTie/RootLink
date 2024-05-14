import { useState } from "react";

function YearInput({ value, onChange }) {
  return (
    <div className="  mx-auto ml-12">
      <label
        htmlFor="adoption-year"
        className="block text-lg font-medium text-gray-700"
      >
        Adoption Year of Adoptee:
      </label>
      <input
        type="number"
        id="adoption-year"
        name="adoptionYear"
        placeholder="YYYY"
        min="1900"
        max={new Date().getFullYear()} // Sets the maximum allowed year to the current year
        value={value}
        onChange={onChange}
        className="mt-1 w-[80%] bg-[#ceeafd20] border-[rgb(10,105,174)] border  block  pl-3 pr-1 py-1.5 text-base  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
}

export default YearInput;

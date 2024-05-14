import { useState } from "react";

function StatusRadioInput({ value, onChange }) {
  return (
    <div className=" ml-12 ">
      <p className="font-medium mt-2 text-[1.1rem] text-gray-700">
        Choose your status:
      </p>
      <label className="inline-flex  mt-3">
        <input
          type="radio"
          name="status"
          value="adoptee"
          className="form-radio bg-[#ceeafd20] border-[rgb(10,105,174)] h-5 w-5 "
          checked={value === "adoptee"}
          onChange={onChange}
        />
        <span className="ml-2 text-gray-700">Adopted</span>
      </label>

      <label className="inline-flex  ml-5  mt-3">
        <input
          type="radio"
          name="status"
          value="nonAdoptee"
          className="form-radio h-5 w-5 text-blue-600"
          checked={value === "nonAdoptee"}
          onChange={onChange}
        />
        <span className="ml-2  text-gray-700">Looking for someone</span>
      </label>
    </div>
  );
}

export default StatusRadioInput;

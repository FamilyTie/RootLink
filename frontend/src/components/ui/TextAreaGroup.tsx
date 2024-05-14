import React from "react";

function TextAreaGroup({ changeBio, value }) {
  return (
    <div className="flex felx-col justify-center">
      <textarea
        className="border bg-[#ceeafd20] border-[rgb(10,105,174)] mt-4 p-2 w-[80%] m-auto  rounded-md"
        id="bio"
        name="bio"
        onChange={changeBio}
        rows={4}
        cols={50}
        value={value}
        placeholder="Tell us about your backround and your journey. Include as much information as you can for matching purposes!"
      />
    </div>
  );
}

export default TextAreaGroup;

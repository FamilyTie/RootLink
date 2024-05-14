function DropdownInput({ value, onChange }) {
  return (
    <div className="max-w-md ml-[3rem] mx-auto ">
      <label
        htmlFor="ethnic-background"
        className="block text-lg font-medium text-gray-700"
      >
        Ethnic Background:
      </label>
      <select
        id="ethnic-background"
        name="ethnicBackground"
        value={value}
        onChange={onChange}
        className="mt-1 block w-[80%] bg-[#ceeafd20] border-[rgb(10,105,174)]   border 0 py-1 text-base  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">Select your ethnic background</option>
        <option value="Asian">Asian</option>
        <option value="Black/African">Black/African</option>
        <option value="Caucasian">Caucasian</option>
        <option value="Hispanic">Hispanic</option>
        <option value="Native American">Native American</option>
        <option value="Pacific Islander">Pacific Islander</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}

export default DropdownInput;

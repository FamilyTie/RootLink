function FormInputGroup({ label, type, value, onChange }) {
  return (
    <>
      <div className="col  ">
        <label htmlFor="input" className=" ml-[3rem] text-[1.2rem] form-label ">
          {label}
        </label>
        <input
          placeholder={`${label}`}
          type={type}
          value={value}
          onChange={onChange}
          className="form-control bg-[#ceeafd20] border pl-1 border-[rgb(10,105,174)] h-[2rem] rounded-sm  ml-[3rem] w-[75%]"
        />
      </div>
    </>
  );
}

export default FormInputGroup;

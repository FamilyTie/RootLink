function FormInputGroup({ label, type, value, onChange }) {
    return (
      <>
        <div className="col">
          <label htmlFor="input" className="form-label">
            {label}
          </label>
          <input
            type={type}
            value={value}
            onChange={onChange}
            className="form-control"
          />
        </div>
      </>
    );
  }
  
  export default FormInputGroup;
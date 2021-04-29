import React from "react";
import PropType from "prop-types";
import classname from "classnames";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classname("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.PropType = {
  name: PropType.string.isRequired,
  value: PropType.string.isRequired,
  error: PropType.string,
  info: PropType.string,
  onChange: PropType.func.isRequired,
  options: PropType.array.isRequired,
};

export default SelectListGroup;

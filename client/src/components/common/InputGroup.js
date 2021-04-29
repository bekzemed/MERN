import React from "react";
import PropType from "prop-types";
import classname from "classnames";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classname("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.PropType = {
  name: PropType.string.isRequired,
  placeholder: PropType.string,
  value: PropType.string.isRequired,
  error: PropType.string,
  onChange: PropType.func.isRequired,
  icon: PropType.string,
  type: PropType.string.isRequired,
};

InputGroup.defaultProps = {
  type: "text",
};

export default InputGroup;

import React from "react";
import PropType from "prop-types";
import classname from "classnames";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classname("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.PropType = {
  name: PropType.string.isRequired,
  placeholder: PropType.string,
  value: PropType.string.isRequired,
  error: PropType.string,
  info: PropType.string,
  type: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
  disabled: PropType.string,
};

PropType.defaultProps = {
  type: "text",
};

export default TextFieldGroup;

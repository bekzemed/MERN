import React from "react";
import PropType from "prop-types";
import classname from "classnames";

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classname("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.PropType = {
  name: PropType.string.isRequired,
  placeholder: PropType.string,
  value: PropType.string.isRequired,
  error: PropType.string,
  info: PropType.string,
  onChange: PropType.func.isRequired,
};

export default TextAreaFieldGroup;

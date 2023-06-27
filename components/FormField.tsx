import React from "react";

type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {title}

        {isTextArea ? (
          <textarea
            className="form_field-input"
            placeholder={placeholder}
            value={state}
            required={type === "create"}
            onChange={(e) => setState(e.target.value)}
          />
        ) : (
          <input
            type={type || "text"}
            className="form_field-input"
            placeholder={placeholder}
            value={state}
            required={type === "create"}
            onChange={(e) => setState(e.target.value)}
          />
        )}
      </label>
    </div>
  );
};

export default FormField;

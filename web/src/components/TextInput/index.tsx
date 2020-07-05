import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertTriangle } from 'react-icons/fi';

interface Props {
  name: string;
  label?: string;
}

type TextInputProps = JSX.IntrinsicElements['input'] & Props;

const TextInput: React.FC<TextInputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        className={error ? 'is-invalid' : ''}
        {...rest}
      />

      {error && (
        <span>
          <FiAlertTriangle color="#e57373" size={20} />
          {error}
        </span>
      )}
    </>
  );
};

export default TextInput;

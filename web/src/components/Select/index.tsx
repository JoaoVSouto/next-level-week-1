import React, { useEffect, useRef } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';

import { selectStyles as styles, selectTheme as theme } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string;
}

const Select: React.FC<Props> = ({ name, label, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }

          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }

        if (!ref.state.value) {
          return '';
        }

        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        theme={theme}
        styles={styles}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
};

export default Select;

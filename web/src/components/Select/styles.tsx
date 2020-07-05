import { Theme, StylesConfig } from 'react-select';

export const selectTheme: (theme: Theme) => Theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: 'rgba(52, 203, 121, 0.6)',
    primary25: 'rgba(52, 203, 121, 0.3)',
  },
});

export const selectStyles: StylesConfig = {
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: (_, state) => ({
    flex: '1 1',
    border: state.selectProps.hasError ? '2px solid var(--error-color)' : '0',
    borderRadius: '8px',
    padding: '16px 24px',
    fontSize: '16px',
    backgroundColor: '#f0f0f5',
    color: 'var(--text-color)',
    transition: 'box-shadow 0.1s',

    '&:focus-within': {
      boxShadow: state.selectProps.hasError
        ? '0 0 0 1px var(--error-color)'
        : '0 0 0 2px var(--primary-color)',
    },
  }),
  placeholder: provided => {
    const color = 'var(--text-color)';

    return {
      ...provided,
      color,
    };
  },
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#6c6c80' : 'inherit',

    '&:active': {
      backgroundColor: 'rgba(52, 203, 121, 0.6)',
    },
  }),
};

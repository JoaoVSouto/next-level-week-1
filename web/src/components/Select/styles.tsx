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
  control: () => ({
    flex: '1 1',
    border: '0',
    borderRadius: '8px',
    padding: '16px 24px',
    fontSize: '16px',
    backgroundColor: '#f0f0f5',
    color: '#6c6c80',
  }),
  placeholder: provided => {
    const color = '#6c6c80';

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

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cs } from 'date-fns/locale';

interface Props extends Omit<DatePickerProps, 'value' | 'onChange'> {
  className?: string;
  helperText?: string;
  error?: boolean;
  value: Date | string | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  disablePast?: boolean;
}

export const DatePicker = forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      error,
      helperText,
      value,
      onChange,
      label,
      required,
      disablePast,
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation();

    const dateValue = value
      ? typeof value === 'string'
        ? new Date(value)
        : value
      : null;

    return (
      <FormControl fullWidth className={className}>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={cs}
          localeText={{
            todayButtonLabel: t('date.today'),
          }}
        >
          <MuiDatePicker
            ref={ref}
            label={required ? `${label} *` : label}
            value={dateValue}
            disablePast={disablePast}
            onChange={onChange}
            format="dd.MM.yyyy"
            slotProps={{
              textField: {
                fullWidth: true,
                error: Boolean(error),
                variant: 'outlined',
                InputLabelProps: {
                  shrink: true,
                },
              },
              openPickerButton: {
                color: 'primary',
                disableRipple: true,
              },
              actionBar: {
                actions: ['today'],
              },
            }}
            sx={{
              svg: { width: '18px', height: '18px' },
            }}
            {...rest}
          />
        </LocalizationProvider>
        {helperText && (
          <FormHelperText error={Boolean(error)}>{helperText}</FormHelperText>
        )}
      </FormControl>
    );
  },
);

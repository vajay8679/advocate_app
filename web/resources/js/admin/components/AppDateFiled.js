import React from 'react';
import {Field, useField} from 'formik';
import {DatePicker} from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const AppDateFiled = (props) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const [open, setOpen] = React.useState(false);
  return (

    <Field
      component={DatePicker}
      open={open}
      variant='outlined'
      inputVariant='outlined'
      format='YYYY-MM-DD'
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      {...props}
      renderInput={(params) => (
        <TextField
          className={props.className}
          {...params}
          onClick={() => {
            setOpen(true);
          }}
          variant="outlined"
          sx={{width: "100%",}}
          helperText={errorText}
          error={!!errorText}
        />
      )}
    />
  );
};

export default AppDateFiled;

AppDateFiled.propTypes = {
  className: PropTypes.string,
};

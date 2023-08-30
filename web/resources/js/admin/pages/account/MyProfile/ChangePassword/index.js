import React from 'react';
import {Box, Typography} from '@mui/material';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {Fonts} from '../../../../shared/constants/AppEnums';
import ChangePasswordForm from './ChangePasswordForm';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from "react-redux";
import {fetchSuccess, fetchError, fetchStart, showMessage} from '../../../../redux/actions';
import UserProfileServices from '../../../../services/UserProfileService';

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required('No password provided.'),
    //.min(4, 'Password is too short - should be 8 chars minimum.'),
    //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/, 'Password must contain least one letter, one number and one special character.'),
  newPassword: yup
    .string()
    .required('New password required.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 'Password must contain least one letter, one number and one special character.'),
  retypeNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match to new password.'),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const handFormSubmit = async (data, callback) => {
     console.log("data: ", data);
    dispatch(fetchStart());
    await UserProfileServices.changePassword(data.oldPassword, data.newPassword, data.retypeNewPassword).then((response) => {
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      callback();
    }).catch(error => {
      dispatch(fetchError(error));
    });
  }
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 650,
      }}
    >
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: {xs: 3, lg: 5},
        }}
      >
        <IntlMessages id='common.changePassword' />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          oldPassword: '',
          newPassword: '',
          retypeNewPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, {setSubmitting, resetForm}) => {
          setSubmitting(true);
          await handFormSubmit(data, resetForm);
          setSubmitting(false);
        }}
      >
        {() => <ChangePasswordForm />}
      </Formik>
    </Box>
  );
};

export default ChangePassword;

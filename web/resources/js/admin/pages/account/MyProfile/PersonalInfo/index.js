import React from 'react';
import {useAuthUser} from '../../../../@crema/utility/AuthHooks';
import {Formik} from 'formik';
import * as yup from 'yup';
import PersonalInfoForm from './PersonalInfoForm';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import AppTextField from '../../../../@crema/core/AppFormComponents/AppTextField';
import {fetchError, fetchStart, fetchSuccess, showMessage} from "../../../../redux/actions";
import UserProfileServices from "../../../../services/UserProfileService";
import {useDispatch} from "react-redux";
import {useAuthMethod} from '../../../../@crema/utility/AuthHooks';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Required'),
});
const PersonalInfo = () => {
  const {user} = useAuthUser();
  const dispatch = useDispatch();
  const {reloadAuthUser} = useAuthMethod();
  const handFormSubmit = async (data) => {
    dispatch(fetchStart());
    await UserProfileServices.updateProfileInfo(data).then((response) => {
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      reloadAuthUser();
    }).catch(error => {
      dispatch(fetchError(error));
    });
  }
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={{
          ...user,
          photoURL: user.photoURL
            ? user.photoURL
            : '/assets/images/placeholder.jpg',
        }}
        validationSchema={validationSchema}
        onSubmit={async (data, {setSubmitting}) => {
          setSubmitting(true);
          await handFormSubmit(data);
          //TODO Api Call here to save user info
          setSubmitting(false);
        }}
      >
        {({values, setFieldValue}) => {
          return (
            <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
          );
        }}
      </Formik>
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};

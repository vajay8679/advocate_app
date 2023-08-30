import React, {useEffect, useState} from 'react';
import {Button, Grid} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import {Form, Formik} from "formik";
import * as yup from "yup";
import Divider from '@mui/material/Divider';
import {useIntl} from "react-intl";

import {fetchError, fetchStart, fetchSuccess, showMessage} from "../../../redux/actions";
import AppGridContainer from "../../../@crema/core/AppGridContainer";
import AppComponentHeader from "../../../@crema/core/AppComponentHeader";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import AppAutocompleteField from "../../../@crema/core/AppFormComponents/AppAutocompleteField";

import BankBranchService from "../../../services/BankBranchService";

const UpdateItem = ({isOpen, handleOpen, values}) => {
  const dispatch = useDispatch();
  const {messages} = useIntl();

  const action = () => {
    return <Button onClick={() => handleOpen(false)}><CloseIcon/></Button>
  }
  const validationSchema = yup.object({
    uuid: yup.string().required(String(messages["validation.uuidRequired"])),
    branch_name: yup.string().required(String(messages["validation.branchNameRequired"])),
    branch_code: yup.string().required(String(messages["validation.branchCodeRequired"])),
    ifsc_code: yup.string().required(String(messages["validation.ifscRequired"])),
  });
  const handleFormSubmit = async (data) => {
    dispatch(fetchStart());
    const reqData = {...data};
    if(typeof reqData.parent != "undefined" && (reqData.parent === '' || reqData.parent === null)) {
      delete reqData.parent;
    }
    await BankBranchService.updateItem(reqData.uuid, reqData).then(response => {
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      handleOpen(true);
    }).catch(error => {
      dispatch(fetchError(error));
    });
  }
  // useEffect(() => {}, [ isOpen]);
  return (<>
    <Drawer
      open={isOpen}
      onClose={() => {
        handleOpen(true)
      }}
      anchor={`right`}
      PaperProps={{
        sx: {minWidth: "30%", maxWidth: '50%'},
      }}
    >
      <Box
        // role='presentation'
        sx={{padding: 5, paddingBottom: 0}}
      >
        <AppComponentHeader
          title={<IntlMessages id="common.bankBranch.update"/>}
          action={action()}
        />
      </Box>
      <Divider/>
      <Box
        role='presentation'
        sx={{padding: 5}}
      >
        <Formik
          validateOnChange={true}
          initialValues={{
            uuid: values.uuid,
            branch_name: values.branch_name,
            branch_code: values.branch_code,
            ifsc_code	: values.ifsc_code,
            contact_person	: values.contact_person,
            contact_number	: values.contact_number,
            branch_address	: values.branch_address,
            bank_uuid	: values.bank_uuid,
            state_id	: values.state_id,
            city_id	: values.city_id,
            country_id	: values.country_id,
            zip	: values.zip,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, {setSubmitting}) => {
            setSubmitting(true);
            await handleFormSubmit(data);
            setSubmitting(false);
          }}
        >
          {({isSubmitting, resetForm, setFieldValue}) => (
            <Form style={{textAlign: "left"}} noValidate autoComplete="off">
              <AppGridContainer spacing={4}>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='branch_name'
                    placeholder={messages["common.bankBranchName"]}
                    label={<IntlMessages id="common.bankBranchName"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='branch_code'
                    placeholder={messages["common.branchCode"]}
                    label={<IntlMessages id="common.branchCode"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='ifsc_code'
                    placeholder={messages["common.ifscCode"]}
                    label={<IntlMessages id="common.ifscCode"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='contact_person'
                    placeholder={messages["common.contactPerson"]}
                    label={<IntlMessages id="common.contactPerson"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='contact_number'
                    placeholder={messages["common.contactNumber"]}
                    label={<IntlMessages id="common.contactNumber"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='branch_address'
                    placeholder={messages["common.branchAddress"]}
                    label={<IntlMessages id="common.branchAddress"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      type="submit"
                      loading={isSubmitting}
                    >
                      <IntlMessages id="common.save"/>
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      type="reset"
                      disabled={isSubmitting}
                      sx={{marginLeft: 2}}
                      onClick={(e) => {
                        resetForm();
                        handleOpen(false);
                      }}
                    >
                      <IntlMessages id="common.cancel"/>
                    </Button>
                  </Box>
                </Grid>
              </AppGridContainer>
            </Form>
          )}
        </Formik>
      </Box>
    </Drawer>
  </>);
}
export default UpdateItem;

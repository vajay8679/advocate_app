import React, {useEffect, useState} from "react";
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
//import AppTextEditor from '../../../components/AppTextEditor/';

import BankBranchService from "../../../services/BankBranchService";
import BankService from "../../../services/BankService";

const AddItem = ({isOpen, handleOpen}) => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [bankList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [loadingBankList, setLoadingBankList] = useState(true);
  const action = () => {
    return <Button onClick={() => handleOpen(false)}><CloseIcon/></Button>
  }
  const validationSchema = yup.object({
    branch_name: yup.string().required(String(messages["validation.branchNameRequired"])),
    branch_code: yup.string().required(String(messages["validation.branchCodeRequired"])),
    ifsc_code: yup.string().required(String(messages["validation.ifscRequired"])),
  });
  const handleFormSubmit = async (data) => {
    dispatch(fetchStart());
    const reqData = {...data};
    await BankBranchService.createItem(reqData).then(response => {
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      handleOpen(true);
    }).catch(error => {
      dispatch(fetchError(error));
    });
  }
  const fetchBankList = (searchStr = '') => {
    setBankList([]);
    setLoadingBankList(true);
    BankService.listItem({
      page: 0,
      page_no: 0,
      page_size: 100,
      searchFilters: JSON.stringify({
        "rules": [
          {"name": "bank_name", "operator": "startsWith", "type": "string", "value": searchStr}
        ]
      })
    }).then(response => {
      setLoadingBankList(false);
      const data = response?.data?.data || [];
      setBankList(data);
    }).catch(error => {
      setLoadingBankList(false);
      setBankList([]);
    });
  }
  useEffect(() => {
    if (isOpen) {
      fetchBankList();
    }
  }, [isOpen]);
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
          title={<IntlMessages id="common.bankBranch.create"/>}
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
            branch_name: "",
            branch_code: '',
            ifsc_code: '',
            contact_person: '',
            contact_number: '',
            branch_address: '',
            bank_uuid: '',
            state_id: '',
            city_id: '',
            country_id: '',
            zip: '',
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
                  <AppAutocompleteField
                    helperText='Please select Bank'
                    name='role'
                    options={bankList}
                    keyName='bank_name'
                    idField='uuid'
                    placeholder='Select Bank'
                    label='Bank'
                    value={selectedBank}
                    handleChange={(e) => {
                      setFieldValue('bank_uuid', e.target.value);
                      setSelectedBank(e.target.value);
                    }}
                    dataLoading={loadingBankList}
                    onType={(val) => {
                      fetchBankList(val);
                    }}
                  />
                </Grid>
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
export default AddItem;

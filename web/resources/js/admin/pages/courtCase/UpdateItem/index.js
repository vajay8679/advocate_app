import React, { useEffect, useState } from 'react';
import { Button, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { Form, Formik } from "formik";
import * as yup from "yup";
import Divider from '@mui/material/Divider';
import { useIntl } from "react-intl";

import { fetchError, fetchStart, fetchSuccess, showMessage } from "../../../redux/actions";
import AppGridContainer from "../../../@crema/core/AppGridContainer";
import AppComponentHeader from "../../../@crema/core/AppComponentHeader";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import AppAutocompleteField from "../../../@crema/core/AppFormComponents/AppAutocompleteField";

import CourtCaseService from "../../../services/CourtCaseService";
import BankService from "../../../services/BankService";
// import BankBranchService from "../../../services/BankBranchService";
import BankBranchesService from '../../../services/BankBranchesService';
import CaseTypeService from "../../../services/CaseTypeService";
import AppDateFiled from "../../../components/AppDateFiled";
// import UsersService from '../../../services/UsersService'
import UsersListsService from '../../../services/UsersListsService';
import StatusService from '../../../services/StatusService';

const UpdateItem = ({ isOpen, handleOpen, values }) => {
  const dispatch = useDispatch();
  const { messages } = useIntl();

  const [selectedBank, setSelectedBank] = useState('');
  const [bankList, setBankList] = useState([]);
  const [loadingBankList, setLoadingBankList] = useState(false);

  const [selectedBankBranches, setSelectedBankBranches] = useState('');
  const [bankBranchesList, setBankBranchesList] = useState([]);
  const [loadingBankBranchesList, setLoadingBankBranchesList] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [loadingStatusList, setLoadingStatusList] = useState(true);
  const [statusList, setStatusList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState('');
  const [loadingUsersList, setLoadingUsersList] = useState(true);



  const [caseType, setCaseType] = useState('');
  const [caseTypesList, setCaseTypesList] = useState([]);

  const action = () => {
    return <Button onClick={() => handleOpen(false)}><CloseIcon /></Button>
  }
  const validationSchema = yup.object({
    uuid: yup.string().required(String(messages["validation.uuidRequired"])),
    title: yup.string().required(String(messages["validation.fieldRequired"])),
    allotted_date: yup.string().required(String(messages["validation.fieldRequired"])),
    case_type: yup.string().required(String(messages["validation.fieldRequired"])),
    bank_id: yup.string().required(String(messages["validation.fieldRequired"])),
    bank_branch_id: yup.string().required(String(messages["validation.fieldRequired"])),
    loan_account_number: yup.string().required(String(messages["validation.fieldRequired"])),
    customer_name: yup.string().required(String(messages["validation.fieldRequired"])),
    customer_phone: yup.string().required(String(messages["validation.fieldRequired"])),
    customer_address: yup.string().required(String(messages["validation.fieldRequired"])),
    symbolic_account: yup.string().required(String(messages["validation.fieldRequired"])),
    assignee_id: yup.string().required(String(messages["validation.fieldRequired"])),
    status_id: yup.string().required(String(messages["validation.fieldRequired"])),
  });
  const handleFormSubmit = async (data) => {
    dispatch(fetchStart());
    const reqData = { ...data };
    if (typeof reqData.parent != "undefined" && (reqData.parent === '' || reqData.parent === null)) {
      delete reqData.parent;
    }
    await CourtCaseService.updateItem(reqData.uuid, reqData).then(response => {
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
          { "name": "bank_name", "operator": "startsWith", "type": "string", "value": searchStr }
        ]
      })
    }).then(response => {
      setLoadingBankList(false);
      const data = response?.data?.data || [];
      setBankList(data);
      console.log('sssssss', data);
    }).catch(error => {
      setLoadingBankList(false);
      setBankList([]);
    });
  }

  const fetchBankBranchesList = (bankId) => {
  setBankBranchesList([]);
  setLoadingBankBranchesList(true);
  if (bankId) {
    BankBranchesService.listItem({
      page: 0,
      page_no: 0,
      page_size: 100,
      bank_id: bankId,
      searchFilters: JSON.stringify({
        "rules": [
          { "name": "bank_id", "operator": "eq", "type": "string", "value": bankId }
        ]
      })
    }).then(response => {
      setLoadingBankBranchesList(false);
      const data = response?.data?.data || [];
      setBankBranchesList(data);
      console.log('889', data);
    }).catch(error => {
      setLoadingBankBranchesList(false);
      setBankBranchesList([]);
    });
  } else {
    setLoadingBankBranchesList(false);
    setBankBranchesList([]);
  }
}


  const fetchCaseTypeList = (bankId) => {
    setCaseTypesList([]);
    CaseTypeService.listItem({
      page: 0,
      page_no: 0,
      page_size: 100,
    }).then(response => {
      const data = response?.data?.data || [];
      setCaseTypesList(data);
    }).catch(error => {
      setCaseTypesList([]);
    });
  }

  const fetchStatusList = (statusId = '') => {
    setStatusList([]);
    setLoadingStatusList(true);
    StatusService.listItem({
      page: 0,
      page_no: 0,
      page_size: 100,
      searchFilters: JSON.stringify({
        "rules": [
          { "name": "name", "operator": "startsWith", "type": "string", "value": statusId }
        ]
      })
    }).then(response => {
      setLoadingStatusList(false);
      const data = response?.data?.data || [];
      setStatusList(data);
      console.log('ppp', data);
    }).catch(error => {
      setLoadingStatusList(false);
      setStatusList([]);
    });
  }
  const fetchUsersList = (usersId = '') => {
    setUsersList([]);
    setLoadingUsersList(true);
    UsersListsService.listItem({
      page: 0,
      page_no: 0,
      page_size: 100,
      searchFilters: JSON.stringify({
        "rules": [
          { "name": "full_name", "operator": "eq", "type": "string", "value": usersId }
        ]
      })
    }).then(response => {
      setLoadingUsersList(false);
      const data = response?.data?.data || [];
      setUsersList(data);
      console.log('ppp', data);
    }).catch(error => {
      setLoadingUsersList(false);
      setUsersList([]);
    });
  }


  const handleInputKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numeric input (digits 0-9)
    if (!/^\d+$/.test(keyValue)) {
      event.preventDefault();
    }
    // Limit to 16 characters
    const currentValue = event.target.value;
    if (currentValue.length >= 16) {
      event.preventDefault();
    }
  };

  const handleInput = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    event.target.value = numericValue;
  };



  useEffect(() => {
    if (isOpen) {
      fetchBankList();
      fetchCaseTypeList();
      fetchUsersList();
      fetchStatusList();
      fetchBankBranchesList(values.bank_id); 
      // ...
    }
  }, [isOpen, values.bank_id]);

  return (<>
    <Drawer
      open={isOpen}
      onClose={() => {
        handleOpen(true)
      }}
      anchor={`right`}
      PaperProps={{
        sx: { minWidth: "30%", maxWidth: '50%' },
      }}
    >
      <Box
        // role='presentation'
        sx={{ padding: 5, paddingBottom: 0 }}
      >
        <AppComponentHeader
          title={<IntlMessages id="common.case.update" />}
          action={action()}
        />
      </Box>
      <Divider />
      <Box
        role='presentation'
        sx={{ padding: 5 }}
      >
        <Formik
          validateOnChange={true}
          initialValues={{
            uuid: values.uuid,
            title: values.title,
            case_type: values.case_type_id,
            allotted_date: values.allotted_date,
            bank_id: values.bank_id,
            bank_branch_id: values.bank_branch_id,
            loan_account_number: values.loan_account_number,
            customer_name: values.customer_name,
            customer_phone: values.customer_phone,
            customer_address: values.customer_address,
            status_id: values.status_id,
            assignee_id: values.assignee_id,
            formatted_case_number:values.formatted_case_number,
            symbolic_account: values.symbolic_account || '',
            case_stage: values.case_stage || '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            await handleFormSubmit(data);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, resetForm, setFieldValue, values }) => (
            <Form style={{ textAlign: "left" }} noValidate autoComplete="off">

              <AppGridContainer spacing={4}>

                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='case_type1'
                    label={'Eminent(Bank Recovery)'}
                    value={"Eminent(Bank Recovery)"}
                    variant="outlined"
                    disabled={true}
                    sx={{ width: "100%", }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='title'
                    placeholder={messages["common.title"]}
                    label={<IntlMessages id="common.title" />}
                    variant="outlined"
                    sx={{ width: "100%", }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <AppAutocompleteField
                    helperText='Please select Users'
                    name='assignee_id'
                    options={usersList}
                    keyName='full_name'
                    idField='id'
                    placeholder='Select Users'
                    label='Users'
                    handleChange={(e) => {
                      console.log('555', e);
                      setFieldValue('assignee_id', e.target.value);
                    }}
                  />
                </Grid>


                <Grid item xs={12} md={12}>
                  <AppDateFiled
                    name='allotted_date'
                    placeholder={messages["common.allottedDate"]}
                    label={<IntlMessages id="common.allottedDate" />}
                    variant="outlined"
                    sx={{ width: "100%", }}
                    onChange={(date) => {
                      console.log('11111', date);
                      setFieldValue('allotted_date', date);
                    }}
                    value={values['allotted_date']}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <AppAutocompleteField
                    helperText='Please select Bank'
                    name='bank_id'
                    options={bankList}
                    keyName='bank_name'
                    idField='id'
                    placeholder='Select Bank'
                    label='Bank'
                    value={selectedBank}
                    handleChange={(e) => {
                      console.log(values)
                      setFieldValue('bank_id', e.target.value);
                      setSelectedBank(e.target.value);
                      fetchBankBranchesList(e.target.value);
                    }}
                    dataLoading={loadingBankList}
                    onType={(val) => {
                      fetchBankList(val);
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} md={12}>
                  <AppAutocompleteField
                    helperText='Please select Bank Branch'
                    name='bank_branch_id'
                    options={bankBranchesList}
                    keyName='branch_name'
                    idField='id'
                    placeholder='Select Bank Branch'
                    label='Bank Branch'
                    value={selectedBankBranches}
                    handleChange={(e) => {
                      setFieldValue('bank_branch_id', e.target.value);
                      setSelectedBankBranches(e.target.value);
                    }}
                    dataLoading={loadingBankBranchesList}
                    onType={(val) => {
                      fetchBankList(val);
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <AppAutocompleteField
                    helperText='Please select Status'
                    name='status_id'
                    options={statusList}
                    keyName='name'
                    idField='id'
                    placeholder='Select Status'
                    label='Status'
                    handleChange={(e) => {
                      setFieldValue('status_id', e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='loan_account_number'
                    placeholder={messages["common.loanAccountNumber"]}
                    label={<IntlMessages id="common.loanAccountNumber" />}
                    variant="outlined"
                    onKeyPress={handleInputKeyPress}
                    sx={{ width: "100%", }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='customer_name'
                    placeholder={messages["common.customerName"]}
                    label={<IntlMessages id="common.customerName" />}
                    variant="outlined"
                    sx={{ width: "100%", }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='customer_phone'
                    placeholder={messages["common.customerPhone"]}
                    label={<IntlMessages id="common.customerPhone" />}
                    variant="outlined"
                    onInput={handleInput} // Call the handleInput function on input event
                    sx={{ width: "100%", }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='customer_address'
                    placeholder={messages["common.customerAddress"]}
                    label={<IntlMessages id="common.customerAddress" />}
                    variant="outlined"
                    sx={{ width: "100%", }}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                    <AppTextField
                      name='formatted_case_number'
                      placeholder={messages["common.caseNumber"]}
                      label={<IntlMessages id="common.caseNumber" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='symbolic_account'
                    placeholder={messages["common.symbolicAccount"]}
                    label={<IntlMessages id="common.symbolicAccount" />}
                    variant="outlined"
                    onInput={handleInput} // Call the handleInput function on input event
                    sx={{ width: "100%", }}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='case_stage'
                    placeholder={messages["common.caseStage"]}
                    label={<IntlMessages id="common.caseStage" />}
                    variant="outlined"
                    sx={{ width: "100%", }}
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
                      <IntlMessages id="common.save" />
                    </LoadingButton>
                    <Button
                      variant="contained"
                      color="warning"
                      type="reset"
                      disabled={isSubmitting}
                      sx={{ marginLeft: 2 }}
                      onClick={(e) => {
                        resetForm();
                        handleOpen(false);
                      }}
                    >
                      <IntlMessages id="common.cancel" />
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

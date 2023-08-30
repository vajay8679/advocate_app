import React, { useEffect, useState } from "react";
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
// import AppDateFiled from "../../../@crema/core/AppFormComponents/AppDateFiled";
import AppDateFiled from "../../../components/AppDateFiled";
import AppAutocompleteField from "../../../@crema/core/AppFormComponents/AppAutocompleteField";
import AppTextEditor from '../../../components/AppTextEditor/';

import BankService from "../../../services/BankService";
import BankBranchService from "../../../services/BankBranchService";
import CaseTypeService from "../../../services/CaseTypeService";
import CourtCaseService from "../../../services/CourtCaseService";
import StatusService from "../../../services/StatusService";
// import UsersService from "../../../services/UsersService";
import UsersListsService from "../../../services/UsersListsService";

const AddItem = ({ isOpen, handleOpen }) => {
  const dispatch = useDispatch();
  const { messages } = useIntl();

  const [selectedBank, setSelectedBank] = useState('');
  const [bankList, setBankList] = useState([]);
  const [loadingBankList, setLoadingBankList] = useState(true);

  const [selectedBankBranch, setSelectedBankBranch] = useState('');
  const [bankBranchList, setBankBranchList] = useState([]);
  const [loadingBankBranchList, setLoadingBankBranchList] = useState(false);
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
    title: yup.string().required(String(messages["validation.fieldRequired"])),
    company: yup.string().required(String(messages["validation.fieldRequired"])),
    vehicle_number: yup.string().required(String(messages["validation.fieldRequired"])),
    fir_number: yup.string().required(String(messages["validation.fieldRequired"])),
    thana: yup.string().required(String(messages["validation.fieldRequired"])),
    cnr: yup.string().required(String(messages["validation.fieldRequired"])),
    filling_number: yup.string().required(String(messages["validation.fieldRequired"])),
    macc_number: yup.string().required(String(messages["validation.fieldRequired"])),
    court_name: yup.string().required(String(messages["validation.fieldRequired"])),
    // date_of_filling: yup.string().required(String(messages["validation.fieldRequired"])),
    // next_date: yup.string().required(String(messages["validation.fieldRequired"])),
    challan: yup.string().required(String(messages["validation.fieldRequired"])),
    company_file_number: yup.string().required(String(messages["validation.fieldRequired"])),
    office_file_number: yup.string().required(String(messages["validation.fieldRequired"])),
    insurance_company: yup.string().required(String(messages["validation.fieldRequired"])),
    vehicle_owner: yup.string().required(String(messages["validation.fieldRequired"])),
    vehicle_driver: yup.string().required(String(messages["validation.fieldRequired"])),
    date_of_disposal: yup.string().required(String(messages["validation.fieldRequired"])),
    assignee_id: yup.string().required(String(messages["validation.fieldRequired"])),
    status_id: yup.string().required(String(messages["validation.fieldRequired"])),
    // death: yup.string().required(String(messages["validation.fieldRequired"])),
  });
  const handleFormSubmit = async (data) => {
    dispatch(fetchStart());
    const reqData = { ...data };
    await CourtCaseService.createItem(reqData).then(response => {
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      handleOpen(true);
    }).catch(error => {
      dispatch(fetchError(error));
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
          { "name": "status_name", "operator": "startsWith", "type": "string", "value": statusId }
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
          { "name": "full_name", "operator": "startsWith", "type": "string", "value": usersId }
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
    }).catch(error => {
      setLoadingBankList(false);
      setBankList([]);
    });
  }
  const fetchBankBranchList = (bankId) => {
    setBankBranchList([]);
    setLoadingBankList(true);
    BankBranchService.listItem({
      page: 0,
      page_no: 0,
      page_size: 100,
      searchFilters: JSON.stringify({
        "rules": [
          { "name": "bank_id", "operator": "eq", "type": "string", "value": bankId }
        ]
      })
    }).then(response => {
      setLoadingBankList(false);
      const data = response?.data?.data || [];
      setBankBranchList(data);
    }).catch(error => {
      setLoadingBankList(false);
      setBankBranchList([]);
    });
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

  const getFormatedNew = (timenew) => {
    var today = new Date(timenew);
    var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiiii", date);
    return date;
  }

  const handleInput = (event) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    event.target.value = numericValue;
  };


  useEffect(() => {
    if (isOpen) {
      fetchBankList();
      fetchStatusList();
      fetchUsersList();
      fetchCaseTypeList();
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
        sx: { minWidth: "30%", maxWidth: '50%' },
      }}
    >
      <Box
        // role='presentation'
        sx={{ padding: 5, paddingBottom: 0 }}
      >
        <AppComponentHeader
          title={<IntlMessages id={"common.case.create"} />}
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
            title: "",
            death: '',
            injury: '',
            company: '',
            vehicle_number: '',
            fir_number: '',
            thana: '',
            fir_delay: '',
            assignee_id: '',
            status_id: '',
            cnr: '',
            filling_number: '',
            macc_number: '',
            court_name: '',
            date_of_filling: '',
            next_date: '',
            company_advocate: '',
            challan: '',
            remark: '',
            company_file_number: '',
            investigation: '',
            office_file_number: '',
            case_stage: '',
            insurance_company: '',
            vehicle_owner: '',
            vehicle_driver: '',
            date_of_disposal: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            await handleFormSubmit(data);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, resetForm, values, setFieldValue }) => {
            console.log("values['death']", values['death']);
            return (
              <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
                <AppGridContainer spacing={4}>

                  {/* <Grid item xs={12} md={12}>
                  <AppAutocompleteField
                    helperText={messages["common.courtCaseType"]}
                    name='case_type'
                    options={caseTypesList}
                    keyName='case_type'
                    idField='id'
                    placeholder={messages["common.courtCaseType"]}
                    label={messages["common.courtCaseType"]}
                    value={values.case_type}
                    handleChange={(e) => {
                      setFieldValue('case_type', e.target.value);
                    }}
                  />
                </Grid> */}

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='case_type1`'
                      label={'MACT(Motor Insurance)'}
                      value={"MACT(Motor Insurance)"}
                      variant="outlined"
                      disabled={true}
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
                    <AppTextField
                      name='title'
                      placeholder={messages["common.title"]}
                      label={<IntlMessages id="common.title" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppDateFiled
                      name='death'
                      placeholder={messages["common.death"]}
                      label={<IntlMessages id="common.death" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                      onChange={(date) => {
                        console.log("ddddddddddddddd", date);
                        setFieldValue('death', date);
                        setFieldValue('case_type', 2);
                      }}
                      value={getFormatedNew(values['death'])}
                    />
                  </Grid>


                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='injury'
                      placeholder={messages["common.injury"]}
                      label={<IntlMessages id="common.injury" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='company'
                      placeholder={messages["common.company"]}
                      label={<IntlMessages id="common.company" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='vehicle_number'
                      placeholder={messages["common.vehicleNumber"]}
                      label={<IntlMessages id="common.vehicleNumber" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='vehicle_owner'
                      placeholder={messages["common.vehicleOwner"]}
                      label={<IntlMessages id="common.vehicleOwner" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='vehicle_driver'
                      placeholder={messages["common.vehicleDriver"]}
                      label={<IntlMessages id="common.vehicleDriver" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='fir_number'
                      placeholder={messages["common.firNumber"]}
                      label={<IntlMessages id="common.firNumber" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='thana'
                      placeholder={messages["common.thana"]}
                      label={<IntlMessages id="common.thana" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='fir_delay'
                      placeholder={messages["common.firDelay"]}
                      label={<IntlMessages id="common.firDelay" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
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
                      name='cnr'
                      placeholder={messages["common.cnr"]}
                      label={<IntlMessages id="common.cnr" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='filling_number'
                      placeholder={messages["common.fillingNumber"]}
                      label={<IntlMessages id="common.fillingNumber" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='macc_number'
                      placeholder={messages["common.maccNumber"]}
                      label={<IntlMessages id="common.maccNumber" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='court_name'
                      placeholder={messages["common.courtName"]}
                      label={<IntlMessages id="common.courtName" />}
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
                    <AppDateFiled
                      name='date_of_filling'
                      placeholder={messages["common.dateOfFilling"]}
                      label={<IntlMessages id="common.dateOfFilling" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                      onChange={(date) => {
                        setFieldValue('date_of_filling', date);
                      }}
                      // value={values['date_of_filling']}
                      value={getFormatedNew(values['date_of_filling'])}
                    />
                  </Grid>


                  <Grid item xs={12} md={12}>
                    <AppDateFiled
                      name='next_date'
                      placeholder={messages["common.nextDate"]}
                      label={<IntlMessages id="common.nextDate" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                      onChange={(date) => {
                        setFieldValue('next_date', date);
                      }}
                      // value={values['next_date']}
                      value={getFormatedNew(values['next_date'])}
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
                    <AppTextField
                      name='company_advocate'
                      placeholder={messages["common.companyAdvocate"]}
                      label={<IntlMessages id="common.companyAdvocate" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='challan'
                      placeholder={messages["common.challan"]}
                      label={<IntlMessages id="common.challan" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='remark'
                      placeholder={messages["common.remark"]}
                      label={<IntlMessages id="common.remark" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='company_file_number'
                      placeholder={messages["common.companyFileNumber"]}
                      label={<IntlMessages id="common.companyFileNumber" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='investigation'
                      placeholder={messages["common.investigation"]}
                      label={<IntlMessages id="common.investigation" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='office_file_number'
                      placeholder={messages["common.officeFileNumber"]}
                      label={<IntlMessages id="common.officeFileNumber" />}
                      variant="outlined"
                      onInput={handleInput}
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppTextField
                      name='insurance_company'
                      placeholder={messages["common.insuranceCompany"]}
                      label={<IntlMessages id="common.insuranceCompany" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <AppDateFiled
                      name='date_of_disposal'
                      placeholder={messages["common.dateOfDisposal"]}
                      label={<IntlMessages id="common.dateOfDisposal" />}
                      variant="outlined"
                      sx={{ width: "100%", }}
                      onChange={(date) => {
                        setFieldValue('date_of_disposal', date);
                      }}
                      // value={values['date_of_filling']}
                      value={getFormatedNew(values['date_of_disposal'])}
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
            )
          }
          }
        </Formik>
      </Box>
    </Drawer>
  </>);
}
export default AddItem;

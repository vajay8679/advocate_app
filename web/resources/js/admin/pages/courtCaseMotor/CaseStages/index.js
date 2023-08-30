import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CourtCaseService from '../../../services/CourtCaseService'
import AppComponentHeader from '../../../@crema/core/AppComponentHeader';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { Box, Button, Card, CardActions, CardHeader, CardContent, Grid, IconButton, TextField, FormControlLabel, Radio, Typography, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import AppLoader from '../../../@crema/core/AppLoader';

import { DatePicker } from '@mui/x-date-pickers';
import { useIntl } from "react-intl";
import * as yup from "yup";
import moment from "moment";
import { Formik, Form, FieldArray } from 'formik';
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import AppDateFiled from "../../../@crema/core/AppFormComponents/AppDateFiled";
import { LoadingButton } from "@mui/lab";
import { FaPlus, FaTrash } from 'react-icons/fa';
import { fetchError, fetchStart, fetchSuccess, showMessage } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";


const CaseStages = (props) => {
  const dispatch = useDispatch();
  const { caseId } = useParams();
  const { messages } = useIntl();
  const [caseInfo, setCaseInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [dateAdd, setPicker] = useState(" ");
  const [dueDate, setDueDate] = useState(" ");
  const [fillingDate, setFillingDate] = useState(" ");
  const [orderDate, setOrderDate] = useState(" ");
  const [physicalDate, setPhysicalDate] = useState(" ");

  const fetchItemDetails = () => {
    setIsLoading(true);
    CourtCaseService.findItem(caseId).then(response => {
      setIsLoading(false);
      setCaseInfo(response.data);
    }).catch(error => {
      console.log('Error while fetching', error);
      setIsLoading(false);
    })
  }
  const handleStageSubmit = async (data, stage, stageIndex) => {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', data);

    dispatch(fetchStart());
    caseInfo.court_case_type.stages[stageIndex].isLoading = true;
    setCaseInfo({ ...caseInfo });
    CourtCaseService.addCaseFile({
      media_title: data.media_title,
      media_url: data.media_url,
      case_id: caseInfo.id,
      case_stage_id: data.case_stage_id,
      stage_id: stage.id,
      date_of_dawa: data.date_of_dawa,
      date_of_kathan: data.date_of_kathan,
      date_of_notice: data.date_of_notice,
      date_of_ws: data.date_of_ws,
      date_of_evidence: data.date_of_evidence,
      date_of_six_seventeen: data.date_of_six_seventeen,
      date_of_question: data.date_of_question,
      date_of_dispose: data.date_of_dispose,
      formatted_case_number:data.formatted_case_number,
    }).then(response => {
      console.log('1234567', response);
      caseInfo.court_case_type.stages[stageIndex].court_case_files.push({
        media_title: data.media_title,
        media_url: data.media_url,
        case_id: caseInfo.id,
        case_stage_id: data.case_stage_id,
        stage_id: stage.id,
        date_of_dawa: data.date_of_dawa,
        date_of_kathan: data.date_of_kathan,
        date_of_notice: data.date_of_notice,
        date_of_ws: data.date_of_ws,
        date_of_evidence: data.date_of_evidence,
        date_of_six_seventeen: data.date_of_six_seventeen,
        date_of_question: data.date_of_question,
        date_of_dispose: data.date_of_dispose,
        formatted_case_number:data.formatted_case_number,

      })
      caseInfo.court_case_type.stages[stageIndex].isLoading = false;
      setCaseInfo({ ...caseInfo });
      console.log('222', caseInfo);
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      fetchItemDetails();
    }).catch(error => {
      caseInfo.court_case_type.stages[stageIndex].isLoading = false;
      setCaseInfo({ ...caseInfo });
      dispatch(fetchError(error));
    })
  }

  const handleRemoveRecord = async (item, itemIndex, stage, stageIndex) => {
    dispatch(fetchStart());
    CourtCaseService.deleteCaseFile(item['uuid']).then
      (response => {
        console.log('GFGFG', item);
        console.log('TRTRTT', itemIndex);
        console.log('UUIUIU', stage);
        console.log('GFGGWEWE', stageIndex);
        caseInfo.court_case_type.stages[stageIndex].court_case_files.splice(itemIndex, 1);
        setCaseInfo({ ...caseInfo });

        fetchItemDetails();
        dispatch(fetchSuccess());
        dispatch(showMessage(response.message));
      }).catch(error => {
        dispatch(fetchError(error));
      })
  }
  const saveHandleStageInfo = async (stage, stageIndex) => {
  }
  const handleCaseStageFieldChange = async (fieldValue, fieldName, stage, stageIndex) => {
    //console.log(fieldValue, fieldName, stage, stageIndex);
    caseInfo.court_case_type.stages[stageIndex].court_case_stage[fieldName] = fieldValue;
    setCaseInfo({ ...caseInfo });
  }



  const handleDate = (date) => {
    const sss = moment(date).format('YYYY-MM-DD')
    console.log('Selected Date: sss', sss);
    setPicker(date)
  };



  useEffect(() => {
    fetchItemDetails();
  }, [caseId]);
  return <>
    <AppComponentHeader
      title={<IntlMessages id="common.case.info" />}
    />
    {isLoading && <AppLoader />}
    <Card sx={{ marginBottom: '20px' }}>
      <CardHeader title='Basic Information'></CardHeader>
      <CardContent>
        <AppGridContainer>

          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.usersName" /> :</strong>
            {/* {caseInfo?.users?.first_name || ''} */}
            {`${caseInfo?.users?.first_name || ''} ${caseInfo?.users?.last_name || ''}`}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.statusName" /> :</strong>
            {caseInfo?.status?.name || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.death" /> :</strong>
            {caseInfo?.death || ''}
          </Grid>

          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.injury" /> :</strong>
            {caseInfo?.injury || ''}
          </Grid>
          {/* <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.company"/> :</strong>
            {caseInfo?.company || ''}
          </Grid> */}
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.vehicleNumber" /> :</strong>
            {caseInfo?.vehicle_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.vehicleOwner" /> :</strong>
            {caseInfo?.vehicle_owner || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.vehicleDriver" /> :</strong>
            {caseInfo?.vehicle_driver || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.firNumber" /> :</strong>
            {caseInfo?.fir_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.thana" /> :</strong>
            {caseInfo?.thana || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.firDelay" /> :</strong>
            {caseInfo?.fir_delay || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.cnr" /> :</strong>
            {caseInfo?.cnr || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.fillingNumber" /> :</strong>
            {caseInfo?.filling_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.maccNumber" /> :</strong>
            {caseInfo?.macc_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.courtName" /> :</strong>
            {caseInfo?.court_name || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.caseNumber" /> :</strong>
            {caseInfo?.formatted_case_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.dateOfFilling" /> :</strong>
            {caseInfo?.date_of_filling || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.nextDate" /> :</strong>
            {caseInfo?.next_date || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.caseStage" /> :</strong>
            {caseInfo?.case_stage || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.companyAdvocate" /> :</strong>
            {caseInfo?.company_advocate || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.challan" /> :</strong>
            {caseInfo?.challan || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.remark" /> :</strong>
            {caseInfo?.remark || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.companyFileNumber" /> :</strong>
            {caseInfo?.company_file_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.investigation" /> :</strong>
            {caseInfo?.investigation || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.officeFileNumber" /> :</strong>
            {caseInfo?.office_file_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.insuranceCompany" /> :</strong>
            {caseInfo?.insurance_company || ''}
          </Grid>

          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.dateOfDisposal" /> :</strong>
            {caseInfo?.date_of_disposal || ''}
          </Grid>
        </AppGridContainer>
      </CardContent>
    </Card>

    {caseInfo?.court_case_type?.stages?.map((stage, stageIndex) => {
      const currentStageInfo = stage.court_case_stage ? stage.court_case_stage : {
        // amount: '',
        // order_date: '',
        date_of_dawa: '',
        date_of_kathan: '',
        date_of_notice: '',
        date_of_ws: '',
        date_of_evidence: '',
        date_of_six_seventeen: '',
        date_of_question: '',
        date_of_dispose: '',
      };


      console.log(currentStageInfo)
      return <section key={`stage-${stage.id}`}>
        <Formik
          validateOnChange={true}
          validationSchema={
            yup.object({
              media_url: yup.string().required(String(messages["validation.fieldRequired"])),
              // date_of_acknowledgment:yup.string().required(String(messages["validation.fieldRequired"])),
              // due_date:yup.string().required(String(messages["validation.fieldRequired"])),
              // date_of_filling:yup.string().required(String(messages["validation.fieldRequired"])),
              // date_of_dm_order:yup.string().required(String(messages["validation.fieldRequired"])),
              // date_of_physical_possession:yup.string().required(String(messages["validation.fieldRequired"])),
            })
          }
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await handleStageSubmit(data, stage, stageIndex);
            setSubmitting(false);
            resetForm();
          }}
          initialValues={{
            media_title: '',
            media_url: '',
            date_of_dawa: '',
            date_of_kathan: '',
            date_of_notice: '',
            date_of_ws: '',
            date_of_evidence: '',
            date_of_six_seventeen: '',
            date_of_question: '',
            date_of_dispose: '',
          }}
        >
          {(props) => (


            <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
              <Box sx={{ marginBottom: '20px' }}>
                <Card>
                  <CardHeader
                    title={stage.stage_name}
                    subheader={stage.stage_description}
                  />
                  {stage.stage_data_type === 'file6' && (<CardContent>
                    <AppGridContainer>

                      {/* <Grid item xs={2} md={2}>
                        <AppTextField
                          label='1'
                          name={`stage_id`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid> */}
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      {/* <Grid item xs={6} md={6} >

                        <FormControl component="fieldset" style={{width:'100%'}}>
                          <FormLabel component="legend" style={{width:'100%'}}>Paper Publication</FormLabel>
                          <RadioGroup
                            aria-label="paper_publication"
                            name="paper_publication"
                            value={props.values.paper_publication}
                            onChange={props.handleChange}
                            sx={{ width: '100', display: 'flex', flexDirection:'row', gap:'60px'}}
                          >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                      </Grid> */}

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_dawa`}
                          // onChange={handleDate}
                          // value={dateAdd}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_dawa', isdate);

                          }}
                          value={props.values.date_of_dawa || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              console.log('3333', item.uuid);
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title :  <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {/* Paper Publication : <b>{item.paper_publication}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                                  Date : <b>{item.date_of_dawa}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file7' && (<CardContent>
                    <AppGridContainer>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_kathan`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_kathan', isdate);
                          }}
                          value={props.values.date_of_kathan || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date : <b>{item.date_of_kathan}</b>&nbsp;
                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file8' && (<CardContent>
                    <AppGridContainer>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_notice`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_notice', isdate);
                          }}
                          value={props.values.date_of_notice || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      {/* <Grid item xs={6} md={6}>
                        <AppTextField
                          label='Case Number'
                          name={`case_number`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid> */}
                      {/* <Grid item xs={6} md={6}>
                        <AppTextField
                          label='Court Name'
                          name={`court_name`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid> */}

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title :  <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date : <b>{item.date_of_notice}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  {/* Case Number : <b>{item.case_number}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Court Name : <b>{item.court_name}</b>&nbsp; */}
                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}


                  {stage.stage_data_type === 'file9' && (<CardContent>
                    <AppGridContainer>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_ws`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_ws', isdate);
                          }}
                          value={props.values.date_of_ws || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      {/* <Grid item xs={3} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          type='button'
                          onClick={(e) => saveHandleStageInfo(stage, stageIndex)}>
                          <IntlMessages id='common.save' />
                        </Button>
                      </Grid> */}

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date : <b>{item.date_of_ws}</b>&nbsp;

                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}


                  {stage.stage_data_type === 'file10' && (<CardContent>
                    <AppGridContainer>

                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_evidence`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_evidence', isdate);
                          }}
                          value={props.values.date_of_evidence || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      {/* <Grid item xs={3} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          type='button'
                          onClick={(e) => saveHandleStageInfo(stage, stageIndex)}>
                          <IntlMessages id='common.save' />
                        </Button>
                      </Grid> */}

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date : <b>{item.date_of_evidence}</b>&nbsp;

                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file11' && (<CardContent>
                    <AppGridContainer>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_six_seventeen`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_six_seventeen', isdate);
                          }}
                          value={props.values.date_of_six_seventeen || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      {/* <Grid item xs={3} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          type='button'
                          onClick={(e) => saveHandleStageInfo(stage, stageIndex)}>
                          <IntlMessages id='common.save' />
                        </Button>
                      </Grid> */}

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date : <b>{item.date_of_six_seventeen}</b>&nbsp;

                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file12' && (<CardContent>
                    <AppGridContainer>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_question`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_question', isdate);
                          }}
                          value={props.values.date_of_question || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      {/* <Grid item xs={3} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          type='button'
                          onClick={(e) => saveHandleStageInfo(stage, stageIndex)}>
                          <IntlMessages id='common.save' />
                        </Button>
                      </Grid> */}

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date : <b>{item.date_of_question}</b>&nbsp;

                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file13' && (<CardContent>
                    <AppGridContainer>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date'
                          name={`date_of_dispose`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_dispose', isdate);
                          }}
                          value={props.values.date_of_dispose || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      {/* <Grid item xs={3} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          type='button'
                          onClick={(e) => saveHandleStageInfo(stage, stageIndex)}>
                          <IntlMessages id='common.save' />
                        </Button>
                      </Grid> */}

                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus />
                          <IntlMessages id="common.add" />
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date : <b>{item.date_of_dispose}</b>&nbsp;

                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash />
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                </Card>
              </Box>
            </Form>)}
        </Formik>

      </section>
    })}
  </>








}
export default CaseStages;


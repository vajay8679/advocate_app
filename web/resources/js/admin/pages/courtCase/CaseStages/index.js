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
    dispatch(fetchStart());
    caseInfo.court_case_type.stages[stageIndex].isLoading = true;
    setCaseInfo({ ...caseInfo });
    CourtCaseService.addCaseFile({
      media_title: data.media_title,
      media_url: data.media_url,
      case_id: caseInfo.id,
      stage_id: stage.id,
      due_date: data.due_date,
      paper_publication: data.paper_publication,
      date_of_acknowledgment: data.date_of_acknowledgment,
      date_of_filling: data.date_of_filling,
      date_of_dm_order: data.date_of_dm_order,
      date_of_physical_possession: data.date_of_physical_possession,
      case_number: data.case_number,
      court_name: data.court_name,
      formatted_case_number: data.formatted_case_number,
    }).then(response => {
      console.log(response);
      caseInfo.court_case_type.stages[stageIndex].court_case_files.push({
        media_title: data.media_title,
        media_url: data.media_url,
        due_date: data.due_date,
        paper_publication: data.paper_publication,
        date_of_acknowledgment: data.date_of_acknowledgment,
        date_of_filling: data.date_of_filling,
        date_of_dm_order: data.date_of_dm_order,
        date_of_physical_possession: data.date_of_physical_possession,
        case_number: data.case_number,
        court_name: data.court_name,
        formatted_case_number: data.formatted_case_number
      })
      caseInfo.court_case_type.stages[stageIndex].isLoading = false;
      setCaseInfo({ ...caseInfo });
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
    //dispatch(fetchStart());
    CourtCaseService.deleteCaseFile(item.uuid).then(response => {
      caseInfo.court_case_type.stages[stageIndex].court_case_files.splice(itemIndex, 1);
      setCaseInfo({ ...caseInfo });
      fetchItemDetails();
      // dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
    }).catch(error => {
      //dispatch(fetchError(error));
    })
  }

  const saveHandleStageInfo = async (stage, stageIndex) => {
    console.log(stagem, stageIndex);
  }
  const handleCaseStageFieldChange = async (fieldValue, fieldName, stage, stageIndex) => {
    //console.log(fieldValue, fieldName, stage, stageIndex);
    caseInfo.court_case_type.stages[stageIndex].court_case_stage[fieldName] = fieldValue;
    setCaseInfo({ ...caseInfo });
  }


  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
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
            <strong><IntlMessages id="common.usersName" />: </strong>
            {`${caseInfo?.users?.first_name || ''} ${caseInfo?.users?.last_name || ''}`}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.allottedDate" />: </strong>
            {caseInfo?.allotted_date || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.bankName" />: </strong>
            {caseInfo?.bank?.bank_name || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.bankBranchName" />: </strong>
            {caseInfo?.bank_branch?.branch_name || ''}
          </Grid>

          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.statusName" />: </strong>
            <span style={{ textTransform: 'capitalize' }}>
              {caseInfo?.status?.name || ''}
            </span>
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.caseStage" />: </strong>
            {caseInfo?.case_stage || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.customerName" />: </strong>
            {caseInfo?.customer_name || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.customerPhone" />: </strong>
            {caseInfo?.customer_phone || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.customerAddress" />: </strong>
            {caseInfo?.customer_address || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.caseNumber" />: </strong>
            {caseInfo?.formatted_case_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.loanAccountNumber" />: </strong>
            {caseInfo?.loan_account_number || ''}
          </Grid>
          <Grid item xs={3} md={3}>
            <strong><IntlMessages id="common.symbolicAccount" />: </strong>
            {caseInfo?.symbolic_account || ''}
          </Grid>


        </AppGridContainer>
      </CardContent>
    </Card>

    {caseInfo?.court_case_type?.stages?.map((stage, stageIndex) => {
      const currentStageInfo = stage.court_case_stage ? stage.court_case_stage : {
        paper_publication: '',
        date_of_acknowledgment: '',
        due_date: '',
        date_of_filling: '',
        date_of_dm_order: '',
        date_of_physical_possession: '',
        case_number: '',
        court_name: '',
      };
      console.log(currentStageInfo)
      return <section key={`stage-${stage.id}`}>
        <Formik
          validateOnChange={true}
          validationSchema={
            yup.object({
              media_url: yup.string().required(String(messages["validation.fieldRequired"])),
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
            paper_publication: '',
            date_of_acknowledgment: '',
            due_date: '',
            date_of_filling: '',
            date_of_dm_order: '',
            date_of_physical_possession: '',
            case_number: '',
            court_name: '',
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
                  {/* {stage.stage_data_type === 'files' && <CardContent>
                    <AppGridContainer>
                      <Grid item xs={2} md={2}>
                        <AppTextField
                          label='File Title'
                          name={`media_title`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{width: '100%'}}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='File Url'
                          name={`media_url`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{width: '100%'}}
                        />
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          <FaPlus/>
                          <IntlMessages id="common.add"/>
                        </LoadingButton>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index+1}</b> &nbsp; &nbsp;
                                  <a href={item.media_url} target="_blank">{item.media_title}</a>
                                </ListItemText>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  type='button'
                                  onClick={(e) => handleRemoveRecord(item, index, stage, stageIndex)}>
                                  <FaTrash/>
                                </Button>
                              </ListItem>
                            })
                          }
                        </List>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>}

                  {stage.stage_data_type === 'date-amount' && <CardContent>
                    <AppGridContainer>
                      <Grid item xs={3} md={3}>
                        <MobileDatePicker
                          value={currentStageInfo.order_date}
                          defaultValue={''}
                          showToolbar={false}
                          disableCloseOnSelect={true}
                          onAccept={()=>{
                            console.log('accepted')
                          }}
                          placeholder={String(messages['common.date'])}
                          label={String(messages['common.date'])}
                          onChange={(date) => {
                            console.log(date);
                            handleCaseStageFieldChange(date, 'order_date', stage, stageIndex)
                          }}
                          renderInput={(params) => (<TextField
                            label={String(messages['common.date'])}
                            variant="outlined"
                            sx={{width: "100%",}}
                            {...params}
                          />)}
                        />
                      </Grid>
                      <Grid item xs={3} md={3}>
                        <AppTextField
                          label={String(messages['common.amount'])}
                          name={`amount`}
                          onChange={(e) => {
                            console.log(e.target.value)
                            handleCaseStageFieldChange(e.target.value, 'amount', stage, stageIndex)
                          }}
                          sx={{width: '100%'}}
                          value={currentStageInfo.amount}
                        />{currentStageInfo.amount}
                      </Grid>
                      <Grid item xs={3} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          type='button'
                          onClick={(e) => saveHandleStageInfo(stage, stageIndex)}>
                          <IntlMessages id='common.save'/>
                        </Button>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>} */}

                  {stage.stage_data_type === 'file1' && (<CardContent>
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

                      <Grid item xs={6} md={6} >

                        <FormControl component="fieldset" style={{ width: '100%' }}>
                          <FormLabel component="legend" style={{ width: '100%' }}>Paper Publication</FormLabel>
                          <RadioGroup
                            aria-label="paper_publication"
                            name="paper_publication"
                            value={props.values.paper_publication}
                            onChange={props.handleChange}
                            sx={{ width: '100', display: 'flex', flexDirection: 'row', gap: '60px' }}
                          >
                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <AppDateFiled
                          label='Date Of Acknowledgment'
                          name={`date_of_acknowledgment`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_acknowledgment', isdate);
                          }}
                          value={props.values.date_of_acknowledgment || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>


                      <Grid item xs={12} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                                  File Title :  <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Paper Publication : <b>{item.paper_publication}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date Of Acknowledgment : <b>{item.date_of_acknowledgment}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

                      <Grid item xs={12} md={12}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          {/* <FaPlus /> */}
                          <IntlMessages id="common.submit" />
                        </LoadingButton>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file2' && (<CardContent>
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
                          label='Due Date'
                          name={`due_date`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('due_date', isdate);
                          }}
                          value={props.values.due_date || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Due Date : <b>{item.due_date}</b>&nbsp;
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

                      <Grid item xs={12} md={12}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          {/* <FaPlus /> */}
                          <IntlMessages id="common.submit" />
                        </LoadingButton>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file3' && (<CardContent>
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
                          label='Date Of Filing'
                          name={`date_of_filling`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_filling', isdate);
                          }}
                          value={props.values.date_of_filling || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='Case Number'
                          name={`case_number`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <AppTextField
                          label='Court Name'
                          name={`court_name`}
                          onChange={(e) => {
                            console.log(e.target.value)
                          }}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title :  <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date Of Filing : <b>{item.date_of_filling}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Case Number : <b>{item.case_number}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Court Name : <b>{item.court_name}</b>&nbsp;
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

                      <Grid item xs={12} md={12}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          {/* <FaPlus /> */}
                          <IntlMessages id="common.submit" />
                        </LoadingButton>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file4' && (<CardContent>
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
                          label='Date Of Dm Order'
                          name={`date_of_dm_order`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_dm_order', isdate);
                          }}
                          value={props.values.date_of_dm_order || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>

                      <Grid item xs={6} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date Of Dm Order : <b>{item.date_of_dm_order}</b>&nbsp;
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

                      <Grid item xs={12} md={12}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          {/* <FaPlus /> */}
                          <IntlMessages id="common.submit" />
                        </LoadingButton>
                      </Grid>
                    </AppGridContainer>
                  </CardContent>)}

                  {stage.stage_data_type === 'file5' && (<CardContent>
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
                          label='Date Of Physical Possession'
                          name={`date_of_physical_possession`}
                          onChange={(date) => {
                            var isdate = moment(date).format('YYYY-MM-DD')
                            props.setFieldValue('date_of_physical_possession', isdate);
                          }}
                          value={props.values.date_of_physical_possession || null}
                          sx={{ width: '100%' }}
                        />
                      </Grid>


                      <Grid item xs={6} md={8}>
                        <List>
                          {
                            stage?.court_case_files?.map((item, index) => {
                              return <ListItem key={`item-${index}`} className="media-file">
                                <ListItemText>
                                  <b>{index + 1}</b> &nbsp; &nbsp;
                                  File Title : <a href={item.media_url} target="_blank">{item.media_title}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  Date Of Physical Possession : <b>{item.date_of_physical_possession}</b>&nbsp;
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

                      <Grid item xs={12} md={12}>
                        <LoadingButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          loading={stage.isLoading}
                        >
                          {/* <FaPlus /> */}
                          <IntlMessages id="common.submit" />
                        </LoadingButton>
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

import React, {useEffect, useState} from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import { useIntl } from "react-intl";
import {Button, ButtonGroup, Grid} from '@mui/material';
import AppGridContainer from "../../@crema/core/AppGridContainer";
import AppComponentCard from "../../@crema/core/AppComponentCard";
import AppComponentHeader from "../../@crema/core/AppComponentHeader";
import AddIcon from "@mui/icons-material/Add";
import AppAnimate from "../../@crema/core/AppAnimate";
import ListItems from "./ListItems";
import AddItem from "./AddItem";
import AppDateFiled from '../../components/AppDateFiled';
import { Form, Formik } from 'formik';
import CaseTypeService from '../../services/CaseTypeService';

const ManageItems = ({entity_type = ''}) => {
  const [caseTypesList, setCaseTypesList] = useState([]);
  const [addItemModal, setAddItemModal] = useState(false);
  const { messages } = useIntl();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [typeId, setTypeId] = useState('');
  const [showDateFilterValue, setShowDateFilterValue] = useState(false);

  

  const [refresh, setRefresh] = useState(0);
  const handleAddItemModal = (reload = false) => {
    if (reload) {
      setRefresh(refresh + 1);
    }
    setAddItemModal(!addItemModal);
  }

// api

// const fetchSearchTypeList = () => {
//   CaseTypeService.searchListItem({
//     // page: 0,
//     // page_no: 0,
//     // page_size: 100,
//     startDate: new Date(startDate).toISOString().split('T')[0],
//     endDate: new Date(endDate).toISOString().split('T')[0],
//     case_type_id : 1
//   }).then(response => {
//     const data = response?.data?.data || [];
//     setCaseTypesList(data);
//   }).catch(error => {
//     setCaseTypesList([]);
//   });
// }

const fetchSearchTypeList = () => {
  CaseTypeService.searchListItem({
    // page: 0,
    // page_no: 0,
    // page_size: 100,
    startDate: new Date(startDate).toISOString().split('T')[0],
    endDate: new Date(endDate).toISOString().split('T')[0],
    case_type_id: 1
  }).then(response => {

    // const data = response?.data?.data || [];
    const data = response?.data?.data || [];
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", data);
    setRefresh(0);
    setCaseTypesList(data);
    setShowDateFilterValue(true)
    console.log(caseTypesList)
  }).catch(error => {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeee", error);

    setCaseTypesList([]);
  });

}

// end

const styles = {
  display: 'flex',
  margin: '20px',
  // Add more CSS properties as needed
};
const stylesdate = {
  margin: '20px',
}

const stylesinput = {
  padding: '6px',
  border: '1px solid #ccc',
  borderRadius: '4px',
}
const stylesbtn = {
  padding: '17px',
  width: '100%',
  background: '#FFF',
  border: '1px solid#000',
  borderRadius: '4px',
}


  const action = () => {
    return <ButtonGroup variant='contained' aria-label='outlined primary button group'>
      <Button onClick={() => handleAddItemModal(false)}><AddIcon/><IntlMessages id="common.createNew"/></Button>
    </ButtonGroup>;
  }

  return (<>
    <AppComponentHeader
      title={<IntlMessages id="common.case.manage"/>}
      description={<IntlMessages id="common.case.description"/>}
      action={action()}
    />

<Formik
      // validateOnChange={true}
      initialValues={{
        start_date: "",
        end_date: '',
      }}
      // validationSchema={validationSchema}
      onSubmit={async (data, { setSubmitting }) => {
        // setSubmitting(true);
        // await handleFormSubmit(data);
        // setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm, values, setFieldValue }) => (
        <Form style={{ textAlign: "left", margin:"30px" }} noValidate autoComplete="off">
          <AppGridContainer spacing={4}>

            <Grid item xs={12} md={3}>
              <AppDateFiled
                name='start_date'
                placeholder={messages["common.startDate"]}
                label={<IntlMessages id="common.startDate" />}
                variant="outlined"
                sx={{ width: "100%", }}
                onChange={(date) => {
                  setFieldValue('start_date', date);
                  setStartDate(date);
                }}
                value={values['start_date']}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <AppDateFiled
                name='end_date'
                placeholder={messages["common.endDate"]}
                label={<IntlMessages id="common.endDate" />}
                variant="outlined"
                sx={{ width: "100%", }}
                onChange={(date) => {
                  // setFieldValue('case_type', 1);
                  setFieldValue('end_date', date);
                  setEndDate(date);
                }}
                value={values['end_date']}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <input type="submit" 
              name="search" 
              className="btn btn-primary btn-sm"
               style={stylesbtn} 
               value="Search" 
               onClick={() => {
                fetchSearchTypeList()
              }}
             
               />
              </Grid>
          </AppGridContainer>
        </Form>
      )}
    </Formik>


    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <AppGridContainer>
        <Grid item xs={12} md={12} lg={12}>
          <AppComponentCard
            title=''
            component={<ListItems refresh={refresh} caseTypesList={caseTypesList} showDateFilterValue={showDateFilterValue} />}
          >
          </AppComponentCard>
        </Grid>
      </AppGridContainer>
    </AppAnimate>
    <AddItem isOpen={addItemModal} handleOpen={handleAddItemModal} />
  </>);
}
export default ManageItems;

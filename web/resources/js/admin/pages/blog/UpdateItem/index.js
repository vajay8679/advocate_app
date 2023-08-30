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

import CategoryService from "../../../services/CategoryService";
import EntityTypeService from "../../../services/EntityTypeService";

const UpdateItem = ({isOpen, handleOpen, values, entity_type}) => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [parentList, setParentList] = useState([]);
  const [entityTypeList, setEntityTypeList] = useState([]);
  const action = () => {
    return <Button onClick={() => handleOpen(false)}><CloseIcon/></Button>
  }
  const validationSchema = yup.object({
    uuid: yup.string().required(String(messages["validation.uuidRequired"])),
    name: yup.string().required(String(messages["validation.nameRequired"])),
    entity_type: yup.string().required(String(messages["validation.entityTypeRequired"])),
  });
  const handleFormSubmit = async (data) => {
    dispatch(fetchStart());
    const reqData = {...data};
    if(typeof reqData.parent != "undefined" && (reqData.parent === '' || reqData.parent === null)) {
      delete reqData.parent;
    }
    await CategoryService.updateItem(reqData.uuid, reqData).then(response => {
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      handleOpen(true);
    }).catch(error => {
      dispatch(fetchError(error));
    });
  }
  const fetchEntityTypeList = () => {
    EntityTypeService.listItem().then(result => {
      setEntityTypeList([
        { entity_type: '', entity_name: 'Select All' },
        ...result.data
      ]);
    })
  }
  useEffect(() => {
    if (isOpen) {
      if(entity_type === null || entity_type ==='') {
        fetchEntityTypeList();
      }
      CategoryService.listItem({entity_type: entity_type}).then(response => {
        if (response.data && response.data.data) {
          const items = [...response.data.data];
          setParentList(items);
        }
      }).catch(error => {
        console.log('Error ', error);
      });
    }
  }, [entity_type, isOpen]);
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
          title={<IntlMessages id="common.category.update"/>}
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
            name: values.name,
            description: values.description,
            entity_type: values.entity_type,
            parent: values.parent,
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
                    name='name'
                    placeholder={messages["common.name"]}
                    label={<IntlMessages id="common.name"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextField
                    name='description'
                    placeholder={messages["common.description"]}
                    label={<IntlMessages id="common.description"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                    multiline={true}
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppAutocompleteField
                    helperText='Please Select Parent Category'
                    name='parent'
                    options={parentList}
                    keyName='name'
                    idField='uuid'
                    placeholder='Select Parent Category'
                    label='Parent Category'
                    handleChange={(e)=> {
                      setFieldValue('parent', e.target.value);
                    }}
                  />
                </Grid>
                {(entity_type === null || entity_type === '') &&
                  <Grid item xs={12} md={12}>
                    <AppAutocompleteField
                      helperText='Select entity type'
                      name='entity_type'
                      options={entityTypeList}
                      keyName='entity_name'
                      idField='entity_type'
                      placeholder='Select entity type'
                      label='Entity Type'
                      handleChange={(e)=> {
                        setFieldValue('entity_type', e.target.value);
                      }}
                    />
                  </Grid>
                }
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

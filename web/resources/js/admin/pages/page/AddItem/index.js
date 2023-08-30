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
import AppTextEditor from '../../../components/AppTextEditor/';

import PageService from "../../../services/PageService";
import CategoryService from "../../../services/CategoryService";

const AddItem = ({isOpen, handleOpen}) => {
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [categoryList, setCategoryList] = useState([]);

  const action = () => {
    return <Button onClick={() => handleOpen(false)}><CloseIcon/></Button>
  }
  const validationSchema = yup.object({
    title: yup.string().required(String(messages["validation.nameRequired"])),
  });
  const handleFormSubmit = async (data) => {
    dispatch(fetchStart());
    const reqData = {...data};
    if(typeof reqData.parent != "undefined" && (reqData.parent === '' || reqData.parent === null)) {
      delete reqData.parent;
    }
    await PageService.createItem(reqData).then(response => {
      dispatch(fetchSuccess());
      dispatch(showMessage(response.message));
      handleOpen(true);
    }).catch(error => {
      dispatch(fetchError(error));
    });
  }
  useEffect(() => {
    if(isOpen){
      CategoryService.listItem({entity_type: 'page'}).then(result => {
        setCategoryList([
          ...result.data.data
        ]);
      })
    }
  }, [isOpen])
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
          title={<IntlMessages id="common.page.create"/>}
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
            title: "",
            description: '',
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
                    name='title'
                    placeholder={messages["common.title"]}
                    label={<IntlMessages id="common.title"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppTextEditor
                    name='content'
                    label={<IntlMessages id="common.content"/>}
                    variant="outlined"
                    sx={{width: "100%",}}
                    onChange={(data) => {
                      console.log(data)
                      setFieldValue('content', data);
                    }}
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

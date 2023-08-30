import React from 'react';
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

import UserService from "../../../services/UserService";

const UpdateItem = ({ isOpen, handleOpen, values, roleList}) => {
    const dispatch = useDispatch();
    const {messages} = useIntl();
    const action = () => {
        return <Button onClick={() => handleOpen(false)}><CloseIcon/></Button>
    }
    const validationSchema = yup.object({
        first_name: yup.string().required(String(messages["validation.firstNameRequired"])),
        last_name: yup.string().required(String(messages["validation.firstNameRequired"])),
        email: yup.string().required(String(messages["validation.emailRequired"])).email(String(messages['validation.emailFormat'])),
        role: yup.string().required(String(messages["validation.userRoleRequired"])),
    });
    const handleFormSubmit = async (data) => {
        dispatch(fetchStart());
        await UserService.updateItem(values.uuid, data).then(response => {
            dispatch(fetchSuccess());
            dispatch(showMessage(response.message));
            handleOpen(true);
        }).catch(error => {
            dispatch(fetchError(error));
        });
    }
    return (<>
        <Drawer
            open={isOpen}
            onClose={()=>{handleOpen(true)}}
            anchor={`right`}
            PaperProps={{
                sx: {minWidth: "30%", maxWidth: '50%'},
            }}
        >
            <Box
                // role='presentation'
                sx= {{padding: 5, paddingBottom: 0}}
            >
                <AppComponentHeader
                    title={<IntlMessages id="common.user.update" />}
                    action={action()}
                />
            </Box>
            <Divider />
            <Box
                role='presentation'
                sx= {{padding: 5}}
            >
                <Formik
                    validateOnChange={true}
                    initialValues={{
                        uuid: values.uuid,
                        status_id: values.status_id,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        email: values.email,
                        role: values.role || '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (data, {setSubmitting})=> {
                        setSubmitting(true);
                        await handleFormSubmit(data);
                        setSubmitting(false);
                    }}
                >
                    {({isSubmitting, resetForm, setFieldValue}) => (
                        <Form style={{textAlign: "left"}} noValidate autoComplete="off">
                            <AppGridContainer spacing={4}>
                                <Grid item xs={12} md={12} >
                                    <AppTextField
                                        name='first_name'
                                        placeholder={messages["common.firstName"]}
                                        label={<IntlMessages id="common.firstName"/>}
                                        variant="outlined"
                                        sx={{width: "100%",}}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <AppTextField
                                        name="last_name"
                                        placeholder={messages["common.lastName"]}
                                        label={<IntlMessages id="common.lastName"/>}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <AppTextField
                                        name="email"
                                        placeholder={messages["common.email"]}
                                        label={<IntlMessages id="common.email"/>}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <AppAutocompleteField
                                        helperText='Please select role'
                                        name='role'
                                        options={roleList}
                                        keyName='name'
                                        idField='name'
                                        placeholder='Select Role'
                                        label='Role'
                                        handleChange={(e)=> {
                                            setFieldValue('role', e.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <AppTextField
                                        name="password"
                                        placeholder={messages["common.password"]}
                                        label={<IntlMessages id="common.password"/>}
                                        variant="outlined"
                                        fullWidth
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

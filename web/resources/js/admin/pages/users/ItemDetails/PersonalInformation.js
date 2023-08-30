import React from 'react';
import {Box, Grid} from "@mui/material";
import {formatDateTime} from '../../../shared/Helper';
import AppGridContainer from '../../../@crema/core/AppGridContainer';
import AppLoader from '../../../@crema/core/AppLoader';

const PersonalInformation = ({isLoading = false, user}) => {
    return (<>
        <Box>
            {isLoading && <AppLoader />}
            <AppGridContainer>
                <Grid item xs={12} md={12}>
                    <strong>Name :</strong> { user?.first_name || '' } { user?.last_name || '' }
                </Grid>
                <Grid item xs={12} md={12}>
                    <strong>Email :</strong> { user?.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : ''}
                </Grid>
                <Grid item xs={12} md={12}>
                    <strong>Phone :</strong> { user?.countryCode || '' } { user?.phoneNumber || '' }
                </Grid>
                <Grid item xs={12} md={12}>
                    <strong>Referral Code :</strong> { user?.referral_code || '' }
                </Grid>
                <Grid item xs={12} md={12}>
                    <strong>Registered On :</strong> { user?.createdAt ? formatDateTime(user.createdAt) : 'N/A'}
                </Grid>
            </AppGridContainer>
        </Box>
    </>)
}
export default PersonalInformation;

import React from 'react';
import {Button, Box, Divider, Drawer, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import CloseIcon from "@mui/icons-material/Close";
import AppComponentHeader from '../../../@crema/core/AppComponentHeader';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import UserService from '../../../services/UserService';

import PersonalInformation from './PersonalInformation';
import AddressInformation from './AddressInformation';

const ItemDetails = ({ isOpen, handleOpen, values}) => {
    const [value, setValue] = React.useState('personal-info');
    const [userInfoLoading, setUserInfoLoading] = React.useState(true);
    const [userInfo, setUserInfo] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const action = () => {
        return <Button onClick={()=>handleOpen(false)}><CloseIcon/></Button>
    }
    const fetchUserInfo = async () => {
        setUserInfoLoading(true);
        UserService.findItem(values.uuid).then(res=> {
            if(res.data) {
                setUserInfo(res.data);
            }
            setUserInfoLoading(false);
        }).catch((error) => {
            setUserInfoLoading(false);
            console.log('Error while fetching user', error);
        })
    }
    React.useEffect(() => {
        if(isOpen && values.uuid) {
            fetchUserInfo();
        }
    }, [isOpen]);
    return (<>
        <Drawer
            open={isOpen}
            onClose={()=>{handleOpen(true)}}
            anchor={`right`}
            PaperProps={{
                sx: { minWidth: "50%", maxWidth: "50%" },
            }}
        >
            <Box
                // role='presentation'
                sx= {{padding: 5, paddingBottom: 0}}
            >
                <AppComponentHeader
                    title={<IntlMessages id="common.user.info" />}
                    action={action()}
                />
            </Box>
            <Divider />
            <Box
                role='presentation'
                sx={{padding: 5}}
            >
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <TabList onChange={handleChange} aria-label='lab API tabs example'>
                            <Tab label='Personal Info' value='personal-info' />
                            {/*<Tab label='Address' value='address-info' />*/}
                        </TabList>
                    </Box>
                    <TabPanel value='personal-info'>
                        <PersonalInformation user={userInfo} isLoading={userInfoLoading}/>
                    </TabPanel>
                    <TabPanel value='address-info'>
                        <AddressInformation user={userInfo} isLoading={userInfoLoading}/>
                    </TabPanel>
                </TabContext>
            </Box>
        </Drawer>
    </>);
}
export default ItemDetails;

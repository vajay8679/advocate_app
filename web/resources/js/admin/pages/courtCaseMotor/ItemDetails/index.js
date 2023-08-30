import React from 'react';
import {Button, Box, Divider, Drawer, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import CloseIcon from "@mui/icons-material/Close";
import AppComponentHeader from '../../../@crema/core/AppComponentHeader';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CourtCaseService from '../../../services/CourtCaseService';

const ItemDetails = ({ isOpen, handleOpen, values}) => {
    const [value, setValue] = React.useState('personal-info');
    const [itemInfoLoading, setItemInfoLoading] = React.useState(true);
    const [itemInfo, setItemInfo] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const action = () => {
        return <Button onClick={()=>handleOpen(false)}><CloseIcon/></Button>
    }
    const fetchItemInfo = async () => {
      setItemInfoLoading(true);
      CourtCaseService.findItem(values.uuid).then(res=> {
            if(res.data) {
                setItemInfo(res.data);
            }
            setItemInfoLoading(false);
        }).catch((error) => {
          setItemInfoLoading(false);
            console.log('Error while fetching case', error);
        })
    }
    React.useEffect(() => {
        if(isOpen && values.uuid) {
          fetchItemInfo();
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
                    title={<IntlMessages id="common.case.info" />}
                    action={action()}
                />
            </Box>
            <Divider />
            <Box
                role='presentation'
                sx={{padding: 5}}
            >

            </Box>
        </Drawer>
    </>);
}
export default ItemDetails;

import React, {useEffect, useState} from 'react';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {Button, ButtonGroup, Grid} from '@mui/material';
import AppGridContainer from "../../@crema/core/AppGridContainer";
import AppComponentCard from "../../@crema/core/AppComponentCard";
import AppComponentHeader from "../../@crema/core/AppComponentHeader";
import AddIcon from "@mui/icons-material/Add";
import AppAnimate from "../../@crema/core/AppAnimate";
import ListItems from "./ListItems";
import AddItem from "./AddItem";

const ManageItems = ({entity_type = ''}) => {
  const [addItemModal, setAddItemModal] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const handleAddItemModal = (reload = false) => {
    if (reload) {
      setRefresh(refresh + 1);
    }
    setAddItemModal(!addItemModal);
  }
  const action = () => {
    return <ButtonGroup variant='contained' aria-label='outlined primary button group'>
      <Button onClick={() => handleAddItemModal(false)}><AddIcon/><IntlMessages id="common.createNew"/></Button>
    </ButtonGroup>;
  }

  return (<>
    <AppComponentHeader
      title={<IntlMessages id="common.bank.manage"/>}
      description={<IntlMessages id="common.bank.description"/>}
      action={action()}
    />
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <AppGridContainer>
        <Grid item xs={12} md={12} lg={12}>
          <AppComponentCard
            title=''
            component={<ListItems refresh={refresh} />}
          >
          </AppComponentCard>
        </Grid>
      </AppGridContainer>
    </AppAnimate>
    <AddItem isOpen={addItemModal} handleOpen={handleAddItemModal} />
  </>);
}
export default ManageItems;

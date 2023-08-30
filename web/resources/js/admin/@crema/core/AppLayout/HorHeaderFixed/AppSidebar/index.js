import React from 'react';
import {toggleNavCollapsed} from '../../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppScrollbar from '../../../AppScrollbar/index.js';
import MainSidebar from '../../components/MainSidebar/index.js';
import Drawer from '@mui/material/Drawer';
import VerticalNav from '../../components/VerticalNav/index.js';
import StandardSidebarWrapper from './StandardSidebarWrapper.js';
import UserInfo from '../../components/UserInfo/index.js';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider.js';

const AppSidebar = (props) => {
  const dispatch = useDispatch();
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);

  const {sidebarTextColor} = useSidebarContext();

  const handleToggleDrawer = () => {
    dispatch(toggleNavCollapsed());
  };

  return (
    <>
      <Drawer
        anchor={props.position}
        open={navCollapsed}
        onClose={() => handleToggleDrawer()}
        classes={{
          root: clsx(props.variant),
          paper: clsx(props.variant),
        }}
        style={{position: 'absolute'}}
      >
        <StandardSidebarWrapper className='standard-sidebar'>
          <MainSidebar>
            <UserInfo color={sidebarTextColor} />
            <AppScrollbar
              sx={{
                py: 2,
                height: 'calc(100vh - 70px) !important',
              }}
              scrollToTop={false}
            >
              <VerticalNav />
            </AppScrollbar>
          </MainSidebar>
        </StandardSidebarWrapper>
      </Drawer>
    </>
  );
};
export default AppSidebar;

AppSidebar.defaultProps = {
  variant: '',
  position: 'left',
};

AppSidebar.propTypes = {
  position: PropTypes.string,
  variant: PropTypes.string,
};

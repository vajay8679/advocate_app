import React from 'react';
import PropsTypes from 'prop-types';
import SidebarBGWrapper from './SidebarBGWrapper.js';
import SidebarWrapper from './SidebarWrapper.js';

const MainSidebar = ({children}) => {
  return (
    <SidebarWrapper className='app-sidebar'>
      <SidebarBGWrapper>{children}</SidebarBGWrapper>
    </SidebarWrapper>
  );
};

export default MainSidebar;
MainSidebar.propTypes = {
  children: PropsTypes.node,
};

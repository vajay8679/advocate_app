import React from 'react';
import HorizontalGroup from './HorizontalGroup.js';
import HorizontalCollapse from './HorizontalCollapse.js';
import HorizontalItem from './HorizontalItem.js';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import routesConfig from '../../../../../pages/routesConfig';

const HorizontalNav = () => {
  return (
    <List className='navbarNav'>
      {routesConfig.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === 'group' && (
            <HorizontalGroup item={item} nestedLevel={0} />
          )}

          {item.type === 'collapse' && (
            <HorizontalCollapse item={item} nestedLevel={0} />
          )}

          {item.type === 'item' && (
            <HorizontalItem item={item} nestedLevel={0} />
          )}

          {item.type === 'divider' && <Divider sx={{my: 5}} />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default HorizontalNav;

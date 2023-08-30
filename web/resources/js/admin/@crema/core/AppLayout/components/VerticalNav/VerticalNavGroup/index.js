import React, {useMemo} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import VerticalCollapse from '../VerticalCollapse/index.js';
import VerticalItem from '../VerticalItem/index.js';
import IntlMessages from '../../../../../utility/IntlMessages.js';
import {checkPermission} from '../../../../../utility/helper/RouteHelper.js';
import {useAuthUser} from '../../../../../utility/AuthHooks.js';
import {useSidebarContext} from '../../../../../utility/AppContextProvider/SidebarContextProvider.js';
import VerticalNavGroupItem from './VerticalNavGroupItem.js';

const VerticalNavGroup = ({item, level}) => {
  const {sidebarTextColor} = useSidebarContext();
  const {user} = useAuthUser();
  const hasPermission = useMemo(
    () => checkPermission(item.permittedRole, user.role),
    [item.permittedRole, user.role],
  );

  if (!hasPermission) {
    return null;
  }
  return (
    <>
      <VerticalNavGroupItem
        level={level}
        sidebarTextColor={sidebarTextColor}
        component='div'
        className={clsx('nav-item nav-item-header')}
      >
        {<IntlMessages id={item.messageId} />}
      </VerticalNavGroupItem>

      {item.children && (
        <>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'group' && (
                <NavVerticalGroup item={item} level={level} />
              )}

              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
};

VerticalNavGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    permittedRole: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    messageId: PropTypes.string,
    children: PropTypes.array,
  }),
  level: PropTypes.number,
};

VerticalNavGroup.defaultProps = {};

const NavVerticalGroup = VerticalNavGroup;

export default NavVerticalGroup;

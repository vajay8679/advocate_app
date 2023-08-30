import React from 'react';
import ListView from './ListView.js';
import PropTypes from 'prop-types';
import ListFooter from './ListFooter.js';

const AppList = ({footerProps, ...props}) => {
  return (
    <ListView
      {...props}
      ListFooterComponent={
        footerProps ? (
          <ListFooter
            loading={footerProps.loading}
            footerText={footerProps.footerText}
          />
        ) : null
      }
    />
  );
};

export default AppList;
AppList.propTypes = {
  border: PropTypes.bool,
  containerStyle: PropTypes.object,
  ListEmptyComponent: PropTypes.node,
  ListFooterComponent: PropTypes.node,
  data: PropTypes.array.isRequired,
  onEndReached: PropTypes.func,
  renderRow: PropTypes.func,
  footerProps: PropTypes.shape({
    loading: PropTypes.bool,
    footerText: PropTypes.string,
  }),
};
AppList.defaultProps = {
  border: false,
  data: [],
};

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  if (notification === null) {
    return null;
  }

  return <div style={style}>{notification}</div>;
};

Notification.propTypes = {
  notification: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notification);

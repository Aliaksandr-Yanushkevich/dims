import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserInfo, getUserTasksList } from '../../redux/reducers/appReducer';
import MemberProgres from './MemberProgress';

class MemberProgresContainer extends Component {
  componentDidMount() {
    const { currentUserId, role, getUserInfo, getUserTasksList } = this.props;

    if (currentUserId && role !== 'member') {
      getUserInfo(currentUserId);
      getUserTasksList(currentUserId);
    }
  }

  render() {
    return <MemberProgres />;
  }
}

const mapStateToProps = (state) => {
  const { currentUserId } = state.app;
  const { role } = state.auth;
  return {
    currentUserId,
    role,
  };
};

MemberProgresContainer.propTypes = {
  role: PropTypes.string,
  currentUserId: PropTypes.string,
  getUserInfo: PropTypes.func.isRequired,
  getUserTasksList: PropTypes.func.isRequired,
};

MemberProgresContainer.defaultProps = {
  role: '',
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo, getUserTasksList })(MemberProgresContainer);

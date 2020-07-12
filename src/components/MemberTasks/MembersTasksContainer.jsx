import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import firebaseApi from '../../api/firebaseApi';
import MemberTasks from './MembersTasks';
import { getUserInfo, getUserTasksList } from '../../redux/reducers/appReducer';

class MemberTasksContainer extends Component {
  componentDidMount() {
    const { currentUserId, getUserInfo, getUserTasksList } = this.props;
    if (currentUserId) {
      getUserInfo(currentUserId);
      getUserTasksList(currentUserId);
    }
  }

  render() {
    return <MemberTasks />;
  }
}

const mapStateToProps = (state) => {
  const { currentUserId } = state.app;

  return {
    currentUserId,
  };
};

MemberTasksContainer.propTypes = {
  currentUserId: PropTypes.string,
};

MemberTasksContainer.defaultProps = {
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo, getUserTasksList })(MemberTasksContainer);

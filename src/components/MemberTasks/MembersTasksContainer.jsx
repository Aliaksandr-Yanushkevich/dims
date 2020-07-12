import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  getUserInfo: PropTypes.func.isRequired,
  getUserTasksList: PropTypes.func.isRequired,
};

MemberTasksContainer.defaultProps = {
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo, getUserTasksList })(MemberTasksContainer);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskPage from './TaskPage';
import { getTask, getUsersWithTask } from '../../redux/reducers/taskPageReducer';
import { getMembers } from '../../redux/reducers/membersReducer';

class TaskPageContainer extends React.Component {
  componentDidMount() {
    const { currentTaskId, getTask, getMembers, getUsersWithTask } = this.props;
    getTask(currentTaskId);
    getMembers();
    getUsersWithTask(currentTaskId);
  }

  render() {
    return <TaskPage />;
  }
}

const mapStateToProps = (state) => {
  const { currentTaskId } = state.app;
  return { currentTaskId };
};

TaskPageContainer.propTypes = {
  currentTaskId: PropTypes.string.isRequired,
  getTask: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  getUsersWithTask: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getTask, getMembers, getUsersWithTask })(TaskPageContainer);

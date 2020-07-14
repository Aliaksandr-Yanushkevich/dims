import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskPage from './TaskPage';
import { getTask, getUsersWithTask, clearUserTasks } from '../../redux/reducers/taskPageReducer';
import { getMembers } from '../../redux/reducers/membersReducer';

class TaskPageContainer extends React.Component {
  componentDidMount() {
    const { taskId, getTask, getMembers, getUsersWithTask, clearUserTasks } = this.props;
    getTask(taskId);
    getMembers();
    getUsersWithTask(taskId);
    clearUserTasks();
  }

  render() {
    return <TaskPage {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { taskId } = state.taskPage;
  return { taskId };
};

TaskPageContainer.propTypes = {
  taskId: PropTypes.string,
  hideMemberPage: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  getUsersWithTask: PropTypes.func.isRequired,
  clearUserTasks: PropTypes.func.isRequired,
};

TaskPageContainer.defaultProps = {
  taskId: '',
};

export default connect(mapStateToProps, { getTask, getMembers, getUsersWithTask, clearUserTasks })(TaskPageContainer);

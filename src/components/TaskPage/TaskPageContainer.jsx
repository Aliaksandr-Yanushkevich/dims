import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskPage from './TaskPage';
import { getTask, getUsersWithTask, clearTaskPage } from '../../redux/reducers/taskPageReducer';

class TaskPageContainer extends React.Component {
  componentDidMount() {
    const { taskId, getTask, getUsersWithTask } = this.props;
    getTask(taskId);
    getUsersWithTask(taskId);
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
  clearTaskPage: PropTypes.func.isRequired,
};

TaskPageContainer.defaultProps = {
  taskId: '',
};

export default connect(mapStateToProps, { getTask, getUsersWithTask, clearTaskPage })(TaskPageContainer);

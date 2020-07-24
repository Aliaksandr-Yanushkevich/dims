import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskPage from './TaskPage';
import { getTask, getUsersWithTask, clearTaskPage } from '../../redux/reducers/taskPageIndex';
import { toggleIsFetching } from '../../redux/reducers/appIndex';

class TaskPageContainer extends React.Component {
  componentDidMount() {
    const { taskId, getTask, getUsersWithTask, toggleIsFetching } = this.props;
    if (taskId !== 'newTask') {
      toggleIsFetching(true);
      const p1 = getTask(taskId);
      const p2 = getUsersWithTask(taskId);
      Promise.all([p1, p2]).then(() => {
        toggleIsFetching(false);
      });
    }
  }

  render() {
    return <TaskPage {...this.props} />;
  }
}

const mapStateToProps = ({ taskPage }) => {
  const { taskId } = taskPage;
  return { taskId };
};

TaskPageContainer.propTypes = {
  taskId: PropTypes.string,
  hideMemberPage: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
  getUsersWithTask: PropTypes.func.isRequired,
  clearTaskPage: PropTypes.func.isRequired,
  toggleIsFetching: PropTypes.func.isRequired,
};

TaskPageContainer.defaultProps = {
  taskId: '',
};

export default connect(mapStateToProps, { getTask, getUsersWithTask, clearTaskPage, toggleIsFetching })(
  TaskPageContainer,
);

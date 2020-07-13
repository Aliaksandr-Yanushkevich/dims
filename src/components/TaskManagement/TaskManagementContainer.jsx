import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskManagement from './TaskManagement';
import { getTaskList } from '../../redux/reducers/taskManagementReducer';

class TaskManagementContainer extends React.Component {
  componentDidMount() {
    const { role, getTaskList } = this.props;
    const isAdmin = role === 'admin';
    const isMentor = role === 'mentor';

    if (isAdmin || isMentor) {
      getTaskList();
    }
  }

  render() {
    return <TaskManagement />;
  }
}

const mapStateToProps = (state) => {
  const { role } = state.auth;
  return { role };
};

TaskManagementContainer.propTypes = {
  role: PropTypes.string,
  getTaskList: PropTypes.func.isRequired,
};

TaskManagementContainer.defaultProps = {
  role: '',
};

export default connect(mapStateToProps, { getTaskList })(TaskManagementContainer);

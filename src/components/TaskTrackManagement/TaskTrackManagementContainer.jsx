import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskTrackManagement from './TaskTrackManagement';
import { getTrackData } from '../../redux/reducers/taskTrackManagementReducer';

class TaskTrackManagementContainer extends React.Component {
  componentDidMount() {
    const { currentUserId, role, getTrackData } = this.props;
    const isMember = role === 'member';

    if (currentUserId && currentUserId !== 'newMember' && isMember) {
      getTrackData(currentUserId);
    }
  }

  render() {
    return <TaskTrackManagement />;
  }
}

const mapStateToProps = (state) => {
  const { role } = state.auth;
  const { currentUserId } = state.app;
  return { role, currentUserId };
};

TaskTrackManagementContainer.propTypes = {
  currentUserId: PropTypes.string,
  role: PropTypes.string,
  getTrackData: PropTypes.func.isRequired,
};

TaskTrackManagementContainer.defaultProps = {
  currentUserId: '',
  role: '',
};

export default connect(mapStateToProps, { getTrackData })(TaskTrackManagementContainer);

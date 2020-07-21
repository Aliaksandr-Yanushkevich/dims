import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskTrackPage from './TaskTrackPage';
import { getTaskTrack } from '../../redux/reducers/taskTrackPageIndex';

class TaskTrackContainer extends React.Component {
  componentDidMount() {
    const { currentTaskTrackId, getTaskTrack } = this.props;
    if (currentTaskTrackId) {
      getTaskTrack(currentTaskTrackId);
    }
  }

  render() {
    return <TaskTrackPage {...this.props} />;
  }
}

const mapStateToProps = ({ taskTrackManagement }) => {
  const { currentTaskTrackId } = taskTrackManagement;
  return { currentTaskTrackId };
};

TaskTrackContainer.propTypes = {
  currentTaskTrackId: PropTypes.string,
  hideTaskTrackPage: PropTypes.func.isRequired,
  getTaskTrack: PropTypes.func.isRequired,
};

TaskTrackContainer.defaultProps = {
  currentTaskTrackId: '',
};

export default connect(mapStateToProps, { getTaskTrack })(TaskTrackContainer);

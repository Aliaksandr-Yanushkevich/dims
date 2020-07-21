import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskTrackManagement from './TaskTrackManagement';
import { getTrackData, setError } from '../../redux/reducers/taskTrackManagementReducer';
import { firestore } from '../../api/firebaseApi';
import { toggleIsFetching } from '../../redux/reducers/appReducer';

class TaskTrackManagementContainer extends React.Component {
  componentDidMount() {
    const { currentUserId, role, getTrackData, setError } = this.props;
    const isMember = role === 'member';
    setError(null);

    if (currentUserId && currentUserId !== 'newMember' && isMember) {
      firestore.collection('TaskTrack').onSnapshot(
        () => {
          getTrackData(currentUserId);
        },
        ({ message }) => {
          setError(message);
        },
      );
    }
  }

  componentWillUnmount() {
    const unsubscribe = firestore.collection('UserProfile').onSnapshot(() => {
      // text doesn't appear in the console, but function unsubscribe doesn't throw an error. here can be bandwidth leak
      // I can't understand example from documentation
      console.log('unsubcribed');
    });
    unsubscribe();
  }

  render() {
    const { toggleIsFetching } = this.props;
    toggleIsFetching(true);
    return <TaskTrackManagement />;
  }
}

const mapStateToProps = ({ auth, app }) => {
  const { role } = auth;
  const { currentUserId } = app;
  return { role, currentUserId };
};

TaskTrackManagementContainer.propTypes = {
  currentUserId: PropTypes.string,
  role: PropTypes.string,
  getTrackData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  toggleIsFetching: PropTypes.func.isRequired,
};

TaskTrackManagementContainer.defaultProps = {
  currentUserId: '',
  role: '',
};

export default connect(mapStateToProps, { getTrackData, setError, toggleIsFetching })(TaskTrackManagementContainer);

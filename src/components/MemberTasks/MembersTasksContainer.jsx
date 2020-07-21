import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MemberTasks from './MembersTasks';
import { getUserInfo, getUserTasksList, setError, toggleIsFetching } from '../../redux/reducers/appIndex';
import { firestore } from '../../api/firebaseApi';

class MemberTasksContainer extends Component {
  componentDidMount() {
    const { currentUserId, getUserInfo, getUserTasksList, setError, toggleIsFetching } = this.props;
    setError(null);
    if (currentUserId) {
      const p1 = getUserInfo(currentUserId);
      const p2 = getUserTasksList(currentUserId);

      Promise.all([p1, p2]).then(() => {
        toggleIsFetching(false);
      });

      firestore.collection('TaskState').onSnapshot(
        () => {
          getUserTasksList(currentUserId).then(() => {
            toggleIsFetching(false);
          });
        },
        ({ message }) => {
          setError(message);
        },
      );
    }
  }

  componentWillUnmount() {
    const unsubscribe = firestore.collection('TaskState').onSnapshot(() => {
      // text doesn't appear in the console, but function unsubscribe doesn't throw an error. here can be bandwidth leak
      // I can't understand example from documentation
      console.log('unsubcribed');
    });
    unsubscribe();
  }

  render() {
    const { toggleIsFetching } = this.props;
    toggleIsFetching(true);
    return <MemberTasks />;
  }
}

const mapStateToProps = ({ app }) => {
  const { currentUserId } = app;

  return {
    currentUserId,
  };
};

MemberTasksContainer.propTypes = {
  currentUserId: PropTypes.string,
  getUserInfo: PropTypes.func.isRequired,
  getUserTasksList: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  toggleIsFetching: PropTypes.func.isRequired,
};

MemberTasksContainer.defaultProps = {
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo, getUserTasksList, setError, toggleIsFetching })(
  MemberTasksContainer,
);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MemberTasks from './MembersTasks';
import { getUserInfo, getUserTasksList, setError } from '../../redux/reducers/appReducer';
import { firestore } from '../../api/firebaseApi';

class MemberTasksContainer extends Component {
  componentDidMount() {
    const { currentUserId, getUserInfo, getUserTasksList, setError } = this.props;
    setError(null);
    if (currentUserId) {
      getUserInfo(currentUserId);
      getUserTasksList(currentUserId);
      firestore.collection('TaskState').onSnapshot(
        () => {
          getUserTasksList(currentUserId);
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
  setError: PropTypes.func.isRequired,
};

MemberTasksContainer.defaultProps = {
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo, getUserTasksList, setError })(MemberTasksContainer);

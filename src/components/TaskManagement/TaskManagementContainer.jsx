import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskManagement from './TaskManagement';
import { setTaskList, setError } from '../../redux/reducers/taskManagementReducer';
import { firestore } from '../../api/firebaseApi';
import prepareTasks from '../../helpers/prepareTasks';

class TaskManagementContainer extends React.Component {
  componentDidMount() {
    const { role, setTaskList, setError } = this.props;
    const isAdmin = role === 'admin';
    const isMentor = role === 'mentor';

    if (isAdmin || isMentor) {
      firestore.collection('Task').onSnapshot(
        (issues) => {
          const taskList = prepareTasks(issues);
          setTaskList(taskList);
        },
        ({ message }) => {
          setError({ message, messageType: 'warning' });
        },
      );
    }
  }

  componentWillUnmount() {
    const unsubscribe = firestore.collection('Task').onSnapshot(() => {
      // text doesn't appear in the console, but function unsubscribe doesn't throw an error. here can be bandwidth leak
      // I can't understand example from documentation
      console.log('unsubcribed');
    });
    unsubscribe();
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
  setTaskList: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

TaskManagementContainer.defaultProps = {
  role: '',
};

export default connect(mapStateToProps, { setTaskList, setError })(TaskManagementContainer);

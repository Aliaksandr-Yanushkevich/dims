import React from 'react';
import TableHeader from '../common/TableHeader/TableHeader';
import { tasksTrackTitle } from '../../constants';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import TasksTracksManagementRow from './TaskTrackManagementRow';

class TasksTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    firebaseApi.getUserTasks(userId).then((response) => this.setState({ tasks: response.tasks }));
  }

  render() {
    const { tasks } = this.state;
    const { userId, setCurrentUser, setCurrentTask } = this.props;
    const tableRows = tasks
      ? tasks.map((task, index) => {
          return (
            <TasksTracksManagementRow
              index={index}
              taskName={task.taskName}
              userId={userId}
              taskId={task.taskId}
              setCurrentUser={setCurrentUser}
              setCurrentTask={setCurrentTask}
            />
          );
        })
      : null;
    if (!tasks) {
      return <Preloader />;
    }
    return (
      <>
        <h1>Task Track Management</h1>
        <table>
          <thead>
            <tr>
              <TableHeader titleArray={tasksTrackTitle} />
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </>
    );
  }
}

export default TasksTracks;

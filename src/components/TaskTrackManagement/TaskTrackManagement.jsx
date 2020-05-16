import React from 'react';
import TableHeader from '../common/TableHeader/TableHeader';
import { tasksTrackTitle } from '../../constants';
import firebaseApi from '../../api/firebaseApi';
import Preloader from '../common/Preloader/Preloader';
import TasksTracksManagementRow from './TaskTrackManagementRow';
import TaskTrack from '../TaskTrack/TaskTrack';

class TasksTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: null,
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    if (userId !== 'newMember') {
      firebaseApi
        .getUserTasks(userId)
        .then((response) => this.setState({ tasks: response.tasks }))
        .catch(() => {
          throw new Error('Error receiving data');
        });
    }
  }

  render() {
    const { tasks } = this.state;
    const { userId, taskId, setCurrentUser, setCurrentTask, taskTrackPageIsVisible, showTaskTrack } = this.props;
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
              showTaskTrack={showTaskTrack}
            />
          );
        })
      : null;
    if (!tasks) {
      return <Preloader />;
    }
    return (
      <>
        {taskTrackPageIsVisible ? (
          <TaskTrack
            userId={userId}
            taskId={taskId}
            setCurrentTask={this.setCurrentTask}
            setCurrentUser={this.setCurrentUser}
            showTaskTrack={showTaskTrack}
          />
        ) : null}
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

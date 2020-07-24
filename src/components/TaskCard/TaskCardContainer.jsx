import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTask } from '../../redux/reducers/taskPageIndex';
import TaskCard from './TaskCard';
import { toggleIsFetching } from '../../redux/reducers/appIndex';

class TaskCardContainer extends React.Component {
  componentDidMount() {
    const { currentTaskId, toggleIsFetching, getTask } = this.props;
    // toggleIsFetching(true);
    getTask(currentTaskId);
    // Promise.all([p1]).then(()=> {
    //   toggleIsFetching(false);
    // })
  }

  render() {
    return <TaskCard {...this.props} />;
  }
}

const mapStateToProps = ({ app }) => {
  const { currentTaskId } = app;
  return { currentTaskId };
};

TaskCardContainer.propTypes = {
  currentTaskId: PropTypes.string,
  toggleIsFetching: PropTypes.func.isRequired,
  getTask: PropTypes.func.isRequired,
};

TaskCardContainer.defaultProps = {
  currentTaskId: '',
};

export default connect(mapStateToProps, { toggleIsFetching, getTask })(TaskCardContainer);

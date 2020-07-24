import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import styles from './TaskCard.module.scss';
import Button from '../common/Button/Button';
import showToast from '../../helpers/showToast';
import Preloader from '../common/Preloader/Preloader';

const TaskCard = ({ name, description, startDate, deadlineDate, message, isFetching, hideTaskCard }) => {
  if (message) {
    showToast(message);
  }
  if (isFetching) {
    return <Preloader />;
  }
  return (
    <>
      <ToastContainer />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Task Info</h1>
        <h3>Task Name</h3>
        <p>{name}</p>
        <h3>Task Description</h3>
        <p>{description}</p>
        <h3>Start Date</h3>
        <p>{startDate}</p>
        <h3>Deadline Date</h3>
        <p>{deadlineDate}</p>
        <Button className={styles.defaultButton} id='backToGrid' onClick={hideTaskCard}>
          Back to grid
        </Button>
      </div>
    </>
  );
};

const mapStateToProps = ({ taskPage, app }) => {
  const { name, description, startDate, deadlineDate, message } = taskPage;
  const { isFetching } = app;
  return { name, description, startDate, deadlineDate, message, isFetching };
};

TaskCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  deadlineDate: PropTypes.instanceOf(Date),
  message: PropTypes.node,
  isFetching: PropTypes.bool.isRequired,
  hideTaskCard: PropTypes.func.isRequired,
};

TaskCard.defaultProps = {
  name: '',
  description: '',
  startDate: '',
  deadlineDate: '',
  message: null,
};

export default connect(mapStateToProps)(TaskCard);

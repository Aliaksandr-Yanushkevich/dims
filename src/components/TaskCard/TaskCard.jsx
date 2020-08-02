import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        <h1 className={styles.title}>
          <FontAwesomeIcon icon={faTasks} className={styles.icon} />
          Task Info
        </h1>
        <h6 className={styles.fieldTitle}>Task Name</h6>
        <p>{name}</p>
        <h6 className={styles.fieldTitle}>Task Description</h6>
        <p>{description}</p>
        <h6 className={styles.fieldTitle}>Start Date</h6>
        <p>{startDate}</p>
        <h6 className={styles.fieldTitle}>Deadline Date</h6>
        <p>{deadlineDate}</p>
        <div className={styles.buttonWrapper}>
          <Button className={styles.defaultButton} id='backToGrid' onClick={hideTaskCard}>
            Back
          </Button>
        </div>
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

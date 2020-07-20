import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import Button from '../Button/Button';
import styles from './DeleteConfirmation.module.scss';
import showToast from '../../../helpers/showToast';

const DeleteConfirmation = ({ children, func, params, hideDeleteConfirmation }) => {
  const deleteAnyway = () => {
    func(params).then((result) => {
      hideDeleteConfirmation();
      return showToast(result);
    });
  };

  return (
    <div className={styles.customModal}>
      <ModalHeader className={styles.modalHeader}>Delete user</ModalHeader>
      <ModalBody className={styles.modalBody}>{children}</ModalBody>
      <ModalFooter>
        <Button className={styles.defaultButton} onClick={hideDeleteConfirmation}>
          Cancel
        </Button>
        <Button className={styles.dangerousButton} onClick={deleteAnyway}>
          Delete
        </Button>
      </ModalFooter>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { func, params } = state.deleteConfirmation;
  return { func, params };
};

DeleteConfirmation.propTypes = {
  children: PropTypes.node,
  func: PropTypes.func.isRequired,
  hideDeleteConfirmation: PropTypes.func.isRequired,
  params: PropTypes.node,
};

DeleteConfirmation.defaultProps = {
  children: null,
  params: null,
};

export default connect(mapStateToProps)(DeleteConfirmation);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../common/Button/Button';
import TableHeader from '../common/TableHeader/TableHeader';
import MemberData from './MemberData';
import Preloader from '../common/Preloader/Preloader';
import styles from './Members.module.scss';
import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import { setCurrentUser } from '../../redux/reducers/appIndex';
import { showMemberPage, clearMemberPage } from '../../redux/reducers/memberPageIndex';
import { showMemberCard } from '../../redux/reducers/membersIndex';
import MemberPageContainer from '../MemberPage/MemberPageContainer';
import DeleteConfirmation from '../common/DeleteConfirmation/DeleteConfirmation';
import { setParameters, showDeleteConfirmation, setFunction } from '../../redux/reducers/deleteConfirmationIndex';
import MemberCardContainer from '../MemberCard/MemberCardContainer';
import TableHeaderCell from '../common/TableHeaderCell/TableHeaderCell';

const Members = ({
  members,
  memberPageIsVisible,
  directions,
  setCurrentUser,
  role,
  showMemberPage,
  message,
  clearMemberPage,
  setParameters,
  setFunction,
  showDeleteConfirmation,
  deleteConfirmationIsVisible,
  memberCardIsVisible,
  showMemberCard,
}) => {
  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';

  const createUser = (e) => {
    e.persist();
    const { id } = e.target.closest('button').dataset;
    setCurrentUser(id);
    showMemberPage(true);
  };

  const hideMemberPage = () => {
    clearMemberPage();
    showMemberPage(false);
  };

  const hideDeleteConfirmation = () => {
    showDeleteConfirmation(false);
  };

  const showMember = (e) => {
    e.persist();
    const { id } = e.target.closest('div').dataset;
    setCurrentUser(id);
    showMemberCard(true);
  };

  const hideMemberCard = () => {
    showMemberCard(false);
  };

  const deleteUser = (e) => {
    e.persist();
    const {
      target: {
        dataset: { id: userId },
      },
    } = e;
    setParameters(userId);
    setFunction(firebaseApi.deleteUser);
    showDeleteConfirmation(true);
  };

  const memberRows = members
    ? members.map((member, index) => {
        const { firstName, lastName, birthDate, directionId, education, startDate, userId } = member;
        return (
          <MemberData
            key={userId}
            role={role}
            index={index + 1}
            firstName={firstName}
            lastName={lastName}
            birthDate={birthDate}
            directionId={directionId}
            directions={directions}
            education={education}
            startDate={startDate}
            userId={userId}
            setCurrentUser={setCurrentUser}
            deleteUser={deleteUser}
            createUser={createUser}
            showMember={showMember}
          />
        );
      })
    : null;

  if (!role) {
    return <Redirect to='/login' />;
  }
  if (!(isAdmin || isMentor)) {
    return <p>Only admininstrators and mentors have acces to this page</p>;
  }

  if (!members && !message) {
    return <Preloader />;
  }
  if (message) {
    showToast({ message, messageType: 'warning' });
  }

  if (members && !members.length) {
    return <p>Member list is empty. Administrators should create it.</p>;
  }

  return (
    <>
      <ToastContainer />
      <Modal id={styles.modalMemberPage} isOpen={memberPageIsVisible} toggle={hideMemberPage} centered>
        <MemberPageContainer hideMemberPage={hideMemberPage} />
      </Modal>

      <Modal isOpen={memberCardIsVisible} toggle={hideMemberCard} centered>
        <MemberCardContainer hideMemberCard={hideMemberCard} />
      </Modal>

      <Modal isOpen={deleteConfirmationIsVisible} toggle={hideDeleteConfirmation} centered>
        <DeleteConfirmation hideDeleteConfirmation={hideDeleteConfirmation}>
          Are you sure to delete this user?
        </DeleteConfirmation>
      </Modal>

      <h1 className={styles.title}>Members Manage Grid</h1>
      <div className={styles.tableWrapper}>
        {isAdmin && (
          <Button className={`${styles.defaultButton} ${styles.register}`} dataId='newMember' onClick={createUser}>
            Register
          </Button>
        )}

        <table>
          <TableHeader>
            <TableHeaderCell title='#' className={styles.memberIndexHeader} />
            <TableHeaderCell title='full name' className={styles.memberNameHeader} />
            <TableHeaderCell title='direction' className={styles.memberDirectionHeader} icon='faGraduationCap' />
            <TableHeaderCell title='education' className={styles.memberEducationHeader} />
            <TableHeaderCell title='start' className={styles.memberStartDateHeader} />
            <TableHeaderCell title='age' className={styles.memberAgeHeader} />
            <TableHeaderCell title='' className={styles.memberButtonsHeader} />
          </TableHeader>

          <tbody>{memberRows}</tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  // destructure can not be used here because naming conflict between members reducer and members field
  const { members, directions, message, memberCardIsVisible } = state.members;
  const { currentUserId } = state.app;
  const { role } = state.auth;
  const { memberPageIsVisible } = state.memberPage;
  const { deleteConfirmationIsVisible, params, func } = state.deleteConfirmation;
  return {
    members,
    directions,
    memberPageIsVisible,
    currentUserId,
    role,
    message,
    deleteConfirmationIsVisible,
    memberCardIsVisible,
    params,
    func,
  };
};

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  memberPageIsVisible: PropTypes.bool.isRequired,
  deleteConfirmationIsVisible: PropTypes.bool.isRequired,
  memberCardIsVisible: PropTypes.bool.isRequired,
  directions: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  role: PropTypes.string,
  setCurrentUser: PropTypes.func.isRequired,
  showMemberPage: PropTypes.func.isRequired,
  clearMemberPage: PropTypes.func.isRequired,
  setParameters: PropTypes.func.isRequired,
  setFunction: PropTypes.func.isRequired,
  showMemberCard: PropTypes.func.isRequired,
  showDeleteConfirmation: PropTypes.func.isRequired,
  message: PropTypes.string,
};

Members.defaultProps = {
  members: [{}],
  directions: [{}],
  role: '',
  message: '',
};

export default connect(mapStateToProps, {
  setCurrentUser,
  showMemberPage,
  clearMemberPage,
  showDeleteConfirmation,
  setParameters,
  setFunction,
  showMemberCard,
})(Members);

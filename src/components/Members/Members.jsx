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
import { membersTitle } from '../../constants';
import styles from './Members.module.scss';
import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';
import { setCurrentUser } from '../../redux/reducers/appReducer';
import { showMemberPage } from '../../redux/reducers/memberPageReducer';
import MemberPageContainer from '../MemberPage/MemberPageContainer';

const Members = ({ members, memberPageIsVisible, directions, setCurrentUser, role, showMemberPage, message }) => {
  const isAdmin = role === 'admin';
  const isMentor = role === 'mentor';
  const createUser = (e) => {
    e.persist();
    const { id } = e.target.dataset;
    setCurrentUser(id);
    showMemberPage(true);
  };

  const hideMemberPage = () => {
    showMemberPage(false);
  };

  const deleteUser = (e) => {
    e.persist();
    const {
      target: {
        dataset: { id: userId },
      },
    } = e;
    firebaseApi.deleteUser(userId).then((result) => {
      showToast(result);
    });
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
    showToast(message);
  }

  if (members && !members.length) {
    return <p>Member list is empty. Administrators should create it.</p>;
  }

  return (
    <>
      <ToastContainer />
      <Modal isOpen={memberPageIsVisible} toggle={hideMemberPage}>
        <MemberPageContainer hideMemberPage={hideMemberPage} />
      </Modal>
      <h1 className={styles.title}>Members Manage Grid</h1>
      <div className={styles.tableWrapper}>
        {isAdmin && (
          <Button className={`${styles.defaultButton} ${styles.register}`} dataId='newMember' onClick={createUser}>
            Register
          </Button>
        )}

        <table>
          <TableHeader titleArray={membersTitle} />
          <tbody>{memberRows}</tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { members, directions, message } = state.members;
  const { currentUserId } = state.app;
  const { role } = state.auth;
  const { memberPageIsVisible } = state.memberPage;
  return { members, directions, memberPageIsVisible, currentUserId, role, message };
};

Members.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  memberPageIsVisible: PropTypes.bool.isRequired,
  directions: PropTypes.arrayOf(PropTypes.shape({ subProp: PropTypes.string })),
  role: PropTypes.string,
  setCurrentUser: PropTypes.func.isRequired,
  showMemberPage: PropTypes.func.isRequired,
  message: PropTypes.string,
};

Members.defaultProps = {
  members: [{}],
  directions: [{}],
  role: '',
  message: '',
};

export default connect(mapStateToProps, { setCurrentUser, showMemberPage })(Members);

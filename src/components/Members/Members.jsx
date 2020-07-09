import React from 'react';
import PropTypes from 'prop-types';
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
import MemberPage from '../MemberPage/MemberPage';
import firebaseApi from '../../api/firebaseApi';
import showToast from '../../helpers/showToast';

class Members extends React.Component {
  state = {
    members: null,
    memberPageIsVisible: false,
    directions: null,
  };

  componentDidMount() {
    firebaseApi.getUsers().then((members) => {
      this.setState({ members });
    });
    firebaseApi.getDirections().then((directions) => {
      this.setState({ directions });
    });
  }

  createUser = (e) => {
    const { setCurrentUser } = this.props;
    setCurrentUser(e);
    this.setState({ memberPageIsVisible: true });
  };

  hideMemberPage = () => {
    this.setState({ memberPageIsVisible: false });
  };

  deleteUser = (e) => {
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

  render() {
    const { members, memberPageIsVisible, directions } = this.state;
    const { currentUserId, setCurrentUser, role } = this.props;
    const isAdmin = role === 'admin';
    const isMentor = role === 'mentor';

    if (!role) {
      return <Redirect to='/login' />;
    }
    if (!(isAdmin || isMentor)) {
      return <p>Only admininstrators and mentors have acces to this page</p>;
    }

    if (!members) {
      return <Preloader />;
    }

    if (!members.length) {
      return <p>Member list is empty. Administrators should create it.</p>;
    }

    const memberRows = members.map((member, index) => {
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
          deleteUser={this.deleteUser}
          createUser={this.createUser}
        />
      );
    });

    return (
      <>
        <ToastContainer />
        <Modal isOpen={memberPageIsVisible} toggle={this.hideMemberPage}>
          <MemberPage userId={currentUserId} hideMemberPage={this.hideMemberPage} />
        </Modal>
        <h1 className={styles.title}>Members Manage Grid</h1>
        <div className={styles.tableWrapper}>
          {isAdmin && (
            <Button
              className={`${styles.defaultButton} ${styles.register}`}
              dataId='newMember'
              onClick={this.createUser}
            >
              Register
            </Button>
          )}

          <table>
            <thead>
              <tr>
                <TableHeader titleArray={membersTitle} />
              </tr>
            </thead>
            <tbody>{memberRows}</tbody>
          </table>
        </div>
      </>
    );
  }
}

Members.propTypes = {
  role: PropTypes.string,
  setCurrentUser: PropTypes.func.isRequired,
  currentUserId: PropTypes.string,
};

Members.defaultProps = {
  role: '',
  currentUserId: '',
};

export default Members;

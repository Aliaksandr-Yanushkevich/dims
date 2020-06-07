import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TableHeader from '../common/TableHeader/TableHeader';
import MemberData from './MemberData';
import Preloader from '../common/Preloader/Preloader';
import { membersTitle } from '../../constants';
import Button from '../Button/Button';
import styles from './Members.module.scss';
import MemberPage from '../MemberPage/MemberPage';
import firebaseApi from '../../api/firebaseApi';

class Members extends React.Component {
  state = {
    members: null,
    memberPageIsVisible: false,
  };

  componentDidMount() {
    const members = [];
    firebaseApi
      .getUsers()
      .then((users) => {
        if (users.size) {
          users.forEach((user) => {
            const { firstName, lastName, birthDate, directionId, education, startDate, userId } = user.data();
            members.push({
              firstName,
              lastName,
              birthDate: birthDate.toDate(),
              directionId,
              education,
              startDate: startDate.toDate(),
              userId,
            });
          });
        }
      })
      .then(() => {
        this.setState({ members });
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
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
    const userId = e.target.dataset.id;
    firebaseApi
      .deleteUser(userId)
      .then(() => {
        console.log('User and all his data succesfully deleted');
      })
      .catch((error) => {
        console.error(`Error removing member: ${error}`);
      });
  };

  render() {
    const { members, memberPageIsVisible } = this.state;
    const { currentUserId, setCurrentUser, role } = this.props;
    if (!role) {
      return <Redirect to='/login' />;
    }
    if (!(role === 'admin' || role === 'mentor')) {
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
        {memberPageIsVisible && <MemberPage userId={currentUserId} hideMemberPage={this.hideMemberPage} />}
        <h1 className={styles.title}>Members Manage Grid</h1>
        <div className={styles.tableWrapper}>
          {role === 'admin' && (
            <Button id={styles.register} dataId='newMember' onClick={this.createUser}>
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

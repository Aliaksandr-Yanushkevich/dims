import React from 'react';
import PropTypes from 'prop-types';
import firebaseApi from '../../api/firebaseApi';
import TableHeader from '../common/TableHeader/TableHeader';
import MemberData from './MemberData';
import Preloader from '../common/Preloader/Preloader';
import { membersTitle } from '../../constants';
import Button from '../Button/Button';
import styles from './Members.module.scss';
import MemberPage from '../MemberPage/MemberPage';
import firebaseTrueApi from '../../api/firebaseTrueApi';

class Members extends React.Component {
  state = {
    members: null,
    memberPageIsVisible: false,
  };

  componentDidMount() {
    const members = [];
    firebaseTrueApi
      .getUsers()
      .then((users) =>
        users.forEach((user) => {
          const { firstName, lastName, birthDate, direction, education, startDate, userId } = user.data();
          members.push({
            firstName,
            lastName,
            birthDate: birthDate.toDate(),
            direction,
            education,
            startDate: startDate.toDate(),
            userId,
          });
        }),
      )
      .then(() => {
        this.setState({ members });
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  }

  createMember = (e) => {
    const { setCurrentUser } = this.props;
    setCurrentUser(e);
    this.setState({ memberPageIsVisible: true });
  };

  hideMemberPage = () => {
    this.setState({ memberPageIsVisible: false });
  };

  deleteMember = (userId) => {
    firebaseApi.deleteMember(userId).catch((error) => {
      console.error(`Error removing member: ${error}`);
    });
  };

  render() {
    const { members, memberPageIsVisible } = this.state;
    const { currentUserId, setCurrentUser } = this.props;
    if (!members) return <Preloader />;
    const memberRows = members.map((member, index) => {
      const { firstName, lastName, birthDate, direction, education, startDate, userId } = member;
      return (
        <MemberData
          key={userId}
          index={index + 1}
          firstName={firstName}
          lastName={lastName}
          birthDate={birthDate}
          direction={direction}
          education={education}
          startDate={startDate}
          userId={userId}
          setCurrentUser={setCurrentUser}
          deleteMember={this.deleteMember}
          createMember={this.createMember}
        />
      );
    });
    return (
      <>
        {memberPageIsVisible && <MemberPage userId={currentUserId} hideMemberPage={this.hideMemberPage} />}
        <h1 className={styles.title}>Members Manage Grid</h1>
        <div className={styles.tableWrapper}>
          <Button id={styles.register} dataId='newMember' onClick={this.createMember}>
            Register
          </Button>
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
  setCurrentUser: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired,
};

export default Members;

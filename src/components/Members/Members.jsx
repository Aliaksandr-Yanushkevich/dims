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

class Members extends React.Component {
  state = {
    memberPageIsVisible: false,
  };

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
    const { memberPageIsVisible } = this.state;
    const { userId, membersArray, setCurrentUser } = this.props;
    if (!membersArray) return <Preloader />;
    const memberRows = membersArray.map((member, index) => (
      <MemberData
        key={`${member.firstName}${member.lastName}`}
        index={index + 1}
        firstName={member.firstName}
        lastName={member.lastName}
        age={member.age}
        direction={member.direction}
        education={member.education}
        startDate={member.startDate}
        userId={member.userId}
        setCurrentUser={setCurrentUser}
        deleteMember={this.deleteMember}
        createMember={this.createMember}
      />
    ));
    return (
      <>
        {memberPageIsVisible ? <MemberPage userId={userId} hideMemberPage={this.hideMemberPage} /> : null}
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
  membersArray: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number,
      direction: PropTypes.string,
      education: PropTypes.string,
      startDate: PropTypes.instanceOf(Date),
      userId: PropTypes.string,
    }),
  ),
  setCurrentUser: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

Members.defaultProps = {
  membersArray: [
    {
      index: 1,
      firstName: 'Ivan',
      lastName: 'Ivanov',
      age: 22,
      direction: 'Java',
      education: 'BSUIR',
      startDate: new Date('December 17, 1995 03:24:00'),
      userId: 'fLFWTByHgY6EZlalpay2',
    },
  ],
};

export default Members;

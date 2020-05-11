import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import firebaseApi from '../../api/firebaseApi';
import TableHeader from '../common/TableHeader/TableHeader';
import MemberData from './MemberData';
import Preloader from '../common/Preloader/Preloader';
import { membersTitle } from '../../constants';
import Button from '../Button/Button';
import styles from './Members.module.scss';

class Members extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteMember = (userId) => {
    firebaseApi.deleteMember(userId).catch(() => {
      throw new Error('Error removing member');
    });
  };

  render() {
    const { membersArray, setCurrentUser } = this.props;
    if (!membersArray) return <Preloader />;
    const memberRows = membersArray.map((member, index) => (
      <MemberData
        key={index.toString()}
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
      />
    ));
    return (
      <>
        <h1>Members Manage Grid</h1>
        <div className={styles.tableWrapper}>
          <NavLink to='/member_page'>
            <Button id={styles.register} dataId='newMember' buttonText='Register' onClick={setCurrentUser} />
          </NavLink>
          {/* <button type='button' onClick={() => firebaseApi.createFakeMembers(20)}>Create members</button> */}
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
  setCurrentUser: PropTypes.func,
  deleteMember: PropTypes.func,
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

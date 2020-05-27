import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateToString from '../common/dateToString';
import styles from './Members.module.scss';
import Button from '../Button/Button';
import TableData from '../common/TableData/TableData';
import firebaseTrueApi from '../../api/firebaseTrueApi';
import getAge from '../../helpers/getAge';

class MemberData extends React.Component {
  state = {
    directions: null,
  };

  componentDidMount() {
    const directions = [];
    firebaseTrueApi
      .getDirections()
      .then((courseDirections) =>
        courseDirections.forEach((direction) => {
          const { directionId, name } = direction.data();
          directions.push({ directionId, name });
        }),
      )
      .then(() => {
        this.setState({ directions });
      })
      .catch((error) => {
        console.error(`Error receiving data: ${error}`);
      });
  }

  render() {
    const {
      index,
      firstName,
      lastName,
      birthDate,
      direction,
      education,
      startDate,
      userId,
      setCurrentUser,
      deleteMember,
      createMember,
    } = this.props;
    const age = getAge(birthDate);
    return (
      <tr key={userId}>
        <TableData>{index}</TableData>
        <TableData>{`${firstName} ${lastName}`}</TableData>
        <TableData>{direction}</TableData>
        <TableData>{education}</TableData>
        <TableData>{dateToString(startDate)}</TableData>
        <TableData>{age}</TableData>
        <TableData>
          <div className={styles.buttonWrapper}>
            <NavLink className={styles.link} to='/member_progress'>
              <Button dataId={userId} onClick={setCurrentUser}>
                Progress
              </Button>
            </NavLink>
            <NavLink className={styles.link} to='/member_tasks'>
              <Button dataId={userId} onClick={setCurrentUser}>
                Tasks
              </Button>
            </NavLink>
            <Button dataId={userId} onClick={createMember}>
              Edit
            </Button>

            <Button dataId={userId} onClick={() => deleteMember(userId)} className={styles.dangerousButton}>
              Delete
            </Button>
          </div>
        </TableData>
      </tr>
    );
  }
}

MemberData.propTypes = {
  index: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  direction: PropTypes.string,
  education: PropTypes.string,
  startDate: PropTypes.instanceOf(Date),
  age: PropTypes.number,
  userId: PropTypes.string,
  setCurrentUser: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  createMember: PropTypes.func.isRequired,
};
MemberData.defaultProps = {
  index: 1,
  firstName: 'Ivan',
  lastName: 'Ivanov',
  direction: 'Javascript',
  education: 'PSU',
  startDate: new Date('December 17, 1995 03:24:00'),
  age: 28,
  userId: '4iKBUOYjXypfQT9Uv9JA',
};

export default MemberData;

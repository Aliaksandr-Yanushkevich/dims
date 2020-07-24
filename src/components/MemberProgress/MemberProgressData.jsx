import React from 'react';
import PropTypes from 'prop-types';
import styles from './MembersProgress.module.scss';
import TableData from '../common/TableData/TableData';
import dateToString from '../../helpers/dateToString';

const MemberProgressData = ({ index, taskId, taskName, trackNote, trackDate, showTask }) => (
  <tr key={`${taskId}${taskName}`}>
    <TableData>{index + 1}</TableData>
    <TableData>
      <p className={styles.link} data-taskid={taskId} onClick={showTask}>
        {taskName}
      </p>
    </TableData>
    <TableData>{trackNote}</TableData>
    <TableData>{trackDate !== '-' ? dateToString(trackDate) : trackDate}</TableData>
  </tr>
);

MemberProgressData.propTypes = {
  taskId: PropTypes.string.isRequired,
  taskName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  trackNote: PropTypes.string.isRequired,
  trackDate: PropTypes.string.isRequired,
  showTask: PropTypes.func.isRequired,
};

export default MemberProgressData;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserInfo, getUserTasksList, toggleIsFetching } from '../../redux/reducers/appReducer';
import MemberProgres from './MemberProgress';

class MemberProgresContainer extends Component {
  componentDidMount() {
    const { currentUserId, role, getUserInfo, getUserTasksList, toggleIsFetching } = this.props;

    if (currentUserId && role !== 'member') {
      const p1 = getUserInfo(currentUserId);
      const p2 = getUserTasksList(currentUserId);
      Promise.all([p1, p2]).then(() => {
        toggleIsFetching(false);
      });
    }
  }

  render() {
    return <MemberProgres />;
  }
}

const mapStateToProps = ({ app, auth }) => {
  const { currentUserId } = app;
  const { role } = auth;
  return {
    currentUserId,
    role,
  };
};

MemberProgresContainer.propTypes = {
  role: PropTypes.string,
  currentUserId: PropTypes.string,
  getUserInfo: PropTypes.func.isRequired,
  getUserTasksList: PropTypes.func.isRequired,
  toggleIsFetching: PropTypes.func.isRequired,
};

MemberProgresContainer.defaultProps = {
  role: '',
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo, getUserTasksList, toggleIsFetching })(MemberProgresContainer);

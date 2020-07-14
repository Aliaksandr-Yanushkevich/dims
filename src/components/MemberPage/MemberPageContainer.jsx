import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MemberPage from './MemberPage';
import { getUserInfo } from '../../redux/reducers/memberPageReducer';

class MemberPageContainer extends React.Component {
  componentDidMount() {
    const { currentUserId, getUserInfo } = this.props;

    if (currentUserId && currentUserId !== 'newMember') {
      getUserInfo(currentUserId);
    }
  }

  render() {
    return <MemberPage {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { currentUserId } = state.app;
  return { currentUserId };
};

MemberPageContainer.propTypes = {
  currentUserId: PropTypes.string,
  getUserInfo: PropTypes.string.isRequired,
};

MemberPageContainer.defaultProps = {
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo })(MemberPageContainer);

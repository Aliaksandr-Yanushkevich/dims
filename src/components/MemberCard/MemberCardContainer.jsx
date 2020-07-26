import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MemberCard from './MemberCard';
import { getUserInfo } from '../../redux/reducers/memberPageIndex';

class MemberCardContainer extends React.Component {
  componentDidMount() {
    const { currentUserId, getUserInfo } = this.props;
    getUserInfo(currentUserId);
  }

  render() {
    return <MemberCard {...this.props} />;
  }
}

const mapStateToProps = ({ app }) => {
  const { currentUserId } = app;
  return { currentUserId };
};

MemberCardContainer.propTypes = {
  currentUserId: PropTypes.string,
  getUserInfo: PropTypes.func.isRequired,
};

MemberCardContainer.defaultProps = {
  currentUserId: '',
};

export default connect(mapStateToProps, { getUserInfo })(MemberCardContainer);

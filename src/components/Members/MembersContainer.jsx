import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Members from './Members';
import { getMembers, getDirections } from '../../redux/reducers/membersReducer';

class MembersContainer extends React.Component {
  componentDidMount() {
    const { getMembers, getDirections } = this.props;
    getMembers();
    getDirections();
  }

  render() {
    return <Members />;
  }
}

MembersContainer.propTypes = {
  getMembers: PropTypes.func.isRequired,
  getDirections: PropTypes.func.isRequired,
};

export default connect(null, { getMembers, getDirections })(MembersContainer);

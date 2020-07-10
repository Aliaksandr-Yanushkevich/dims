import React from 'react';
import { connect } from 'react-redux';
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

export default connect(null, { getMembers, getDirections })(MembersContainer);

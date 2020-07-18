import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Members from './Members';
import { getDirections, setMembers } from '../../redux/reducers/membersReducer';
import { firestore } from '../../api/firebaseApi';
import prepareMembers from '../../helpers/prepareMembers';

class MembersContainer extends React.Component {
  componentDidMount() {
    const { getDirections, setMembers } = this.props;
    getDirections();
    firestore.collection('UserProfile').onSnapshot((users) => {
      const members = prepareMembers(users);
      setMembers(members);
    });
  }

  componentWillUnmount() {
    const unsubscribe = firestore.collection('UserProfile').onSnapshot(() => {
      // text doesn't appear in the console, but function unsubscribe doesn't throw an error. here can be bandwidth leak
      // I can't understand example from documentation
      console.log('unsubcribed');
    });
    unsubscribe();
  }

  render() {
    return <Members />;
  }
}

MembersContainer.propTypes = {
  getMembers: PropTypes.func.isRequired,
  getDirections: PropTypes.func.isRequired,
};

export default connect(null, { getDirections, setMembers })(MembersContainer);

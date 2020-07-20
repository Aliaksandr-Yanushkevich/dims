import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Members from './Members';
import { getDirections, setMembers, setError } from '../../redux/reducers/membersReducer';
import { firestore } from '../../api/firebaseApi';
import prepareMembers from '../../helpers/prepareMembers';

class MembersContainer extends React.Component {
  componentDidMount() {
    const { getDirections, setMembers, setError } = this.props;
    setError(null);
    getDirections();
    firestore.collection('UserProfile').onSnapshot(
      (users) => {
        const members = prepareMembers(users);
        setMembers(members);
      },
      ({ message }) => {
        setError(message);
      },
    );
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
  getDirections: PropTypes.func.isRequired,
  setMembers: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default connect(null, { getDirections, setMembers, setError })(MembersContainer);

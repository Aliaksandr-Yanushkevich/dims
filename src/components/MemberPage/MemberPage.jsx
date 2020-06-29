import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import Preloader from '../common/Preloader/Preloader';
import Button from '../Button/Button';
import styles from './MemberPage.module.scss';
import Select from '../common/Select/Select';
import firebaseApi from '../../api/firebaseApi';
import directionsToOptions from '../../helpers/directionsToOptions';
import dateToStringForInput from '../../helpers/dateToStringForInput';
import generateID from '../../helpers/generateID';
import TextField from '../common/TextField/TextField';
import memberPageFields from './memberPageFields';
import { preparedGenders } from '../../constants';
import DateField from '../common/DateField/DateField';
import NumberField from '../common/NumberField/NumberField';
import validateMemberPageForm from '../../helpers/validators/validateMemberPageForm';
import FormMessage from '../common/FormMessage/FormMessage';

class MemberPage extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      sex: 'male',
      mobilePhone: '',
      email: '',
      startDate: dateToStringForInput(new Date()),
      skype: '',
      birthDate: '',
      directionId: 0,
      address: '',
      education: '',
      mathScore: '',
      universityAverageScore: '',
      message: '',
      isFetching: false,
    };
    this.root = document.createElement('div');
    document.body.appendChild(this.root);
  }

  componentDidMount() {
    const { userId } = this.props;

    this.setState({ message: '' });

    if (userId && userId !== 'newMember') {
      this.setState({ isFetching: true });
      firebaseApi.getUserInfo(userId).then((userInfo) => {
        const { startDate, birthDate } = userInfo;
        this.setState({
          ...userInfo,
          startDate: dateToStringForInput(startDate.toDate()),
          birthDate: dateToStringForInput(birthDate.toDate()),
          isFetching: false,
        });
      });
    }

    firebaseApi.getDirections().then((directions) => {
      this.setState({ directions });
    });
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  createUser = () => {
    let { userId } = this.props;
    const {
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    } = this.state;

    const isValid = validateMemberPageForm(
      firstName,
      lastName,
      sex,
      mobilePhone,
      email,
      startDate,
      skype,
      birthDate,
      directionId,
      address,
      education,
      mathScore,
      universityAverageScore,
    );

    if (isValid.formIsValid) {
      const userInfo = {
        userId,
        firstName,
        lastName,
        sex,
        mobilePhone,
        email,
        startDate: new Date(startDate),
        skype,
        birthDate: new Date(birthDate),
        directionId,
        address,
        education,
        mathScore,
        universityAverageScore,
      };

      if (userId === 'newMember') {
        userId = generateID();
        firebaseApi.createUser(userId, { ...userInfo, userId }).then(({ message, messageType }) => {
          this.setState({ message, messageType });
        });
      } else {
        firebaseApi.updateUser(userId, userInfo).then(({ message, messageType }) => {
          this.setState({ message, messageType });
        });
      }
    } else {
      const { message, messageType } = isValid;
      this.setState({ message, messageType });
    }
  };

  disableChangingEmail = (name) => {
    const { userId } = this.props;
    if (userId !== 'newMember' && name === 'email') {
      return true;
    }
    return false;
  };

  onChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ message: '' });
    let preparedValue = value;
    if (name === 'directionId' || name === 'mathScore' || name === 'universityAverageScore') {
      preparedValue = Number(value);
    }
    this.setState({ [name]: preparedValue });
  };

  render() {
    const { userId, hideMemberPage } = this.props;
    const { isFetching, directions, message, messageType } = this.state;

    const preparedDirections = directionsToOptions(directions);

    const fields = memberPageFields.map((field) => {
      const { id, name, type, label, placeholder, regexp, errorMessage, step } = field;
      if (type === 'text') {
        return (
          <TextField
            key={id}
            id={id}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            value={this.state[name]}
            onChange={this.onChange}
            regexp={regexp}
            errorMessage={errorMessage}
            disabled={this.disableChangingEmail(name)}
            className={styles.inputGroup}
          />
        );
      }
      if (name === 'sex') {
        return (
          <Select
            key={id}
            id={id}
            name={name}
            label={label}
            value={this.state[name]}
            onChange={this.onChange}
            options={preparedGenders}
          />
        );
      }
      if (name === 'directionId') {
        return (
          <Select
            key={id}
            id={id}
            name={name}
            label={label}
            value={this.state[name]}
            onChange={this.onChange}
            options={preparedDirections}
          />
        );
      }
      if (type === 'date') {
        return (
          <DateField key={id} id={id} name={name} label={label} value={this.state[name]} onChange={this.onChange} />
        );
      }
      if (type === 'number') {
        return (
          <NumberField
            key={id}
            id={id}
            name={name}
            label={label}
            step={step}
            placeholder={placeholder}
            value={this.state[name]}
            onChange={this.onChange}
            regexp={regexp}
            errorMessage={errorMessage}
          />
        );
      }
      return null;
    });

    if (isFetching) {
      return <Preloader />;
    }

    return ReactDom.createPortal(
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{userId === 'newMember' ? 'Register Member' : 'Edit Member'}</h1>
        <form>{fields}</form>
        <FormMessage className={styles.customMessage} messageType={messageType}>
          {message}
        </FormMessage>
        <div className={styles.buttonWrapper}>
          <Button className={styles.successButton} onClick={this.createUser}>
            {userId !== 'newMember' ? 'Save' : 'Create'}
          </Button>

          <Button onClick={hideMemberPage}>Back to grid</Button>
        </div>
      </div>,
      this.root,
    );
  }
}

MemberPage.propTypes = {
  userId: PropTypes.string.isRequired,
  hideMemberPage: PropTypes.func.isRequired,
};

export default MemberPage;

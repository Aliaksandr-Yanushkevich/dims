import React from 'react';
import PropTypes from 'prop-types';
import checkRequirements from '../../helpers/validators/checkRequirements';
import { requiredMessage } from '../../constants';

const withState = (WrappedComponent) => {
  class EnhancedComponent extends React.Component {
    state = {
      touched: false,
      message: null,
    };

    onFocus = () => {
      this.setState({ touched: true });
    };

    checkField = () => {
      const { value, regexp, errorMessage } = this.props;
      const { touched } = this.state;
      if (touched) {
        const fieldIsValid = checkRequirements(regexp, value);

        if (!value.length) {
          this.setState({ message: requiredMessage });
        } else if (!fieldIsValid) {
          this.setState({ message: errorMessage });
        } else {
          this.setState({ message: null });
        }
      }
    };

    render() {
      const { state, onFocus, checkField, props } = this;
      return <WrappedComponent state={state} onFocus={onFocus} checkField={checkField} {...props} />;
    }
  }

  EnhancedComponent.propTypes = {
    value: PropTypes.string.isRequired,
    regexp: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  EnhancedComponent.defaultProps = {
    regexp: '',
    errorMessage: '',
  };

  return EnhancedComponent;
};

export default withState;

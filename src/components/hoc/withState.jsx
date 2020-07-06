import React from 'react';
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
      const { value, regexp, errorMessage } = WrappedComponent.props;
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
      debugger;
      return (
        <WrappedComponent state={this.state} onFocus={this.onFocus} checkField={this.checkField} {...this.props} />
      );
    }
  }

  return EnhancedComponent;
};

export default withState;

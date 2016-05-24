import React, { Component, PropTypes } from 'react';

export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = props.handleChange.bind(this);
  }

  render() {
    const { type, placeholder, value } = this.props;
    return (
      <input type={ type }
        onChange= { this.handleChange }
        placeholder={ placeholder }
        defaultValue={ value }
      />
    );
  }
}

InputField.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

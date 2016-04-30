import React, { Component, PropTypes } from 'react';

export default class InputTextField extends Component {
  constructor(props) {
    super(props);
    this.handleChange = props.handleChange.bind(this);
  }

  render() {
    const { rows, cols, placeholder, value, id } = this.props;
    return (
      <textarea rows={ rows }
        id={ id }
        name={ id }
        cols={ cols }
        onChange= { this.handleChange }
        placeholder={ placeholder }
        defaultValue={ value }
      />
    );
  }
}

InputTextField.propTypes = {
  id: PropTypes.string.isRequired,
  rows: PropTypes.string.isRequired,
  cols: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

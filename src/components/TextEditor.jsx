import React from 'react';
import MuiComponent from './MuiComponent';
import TextField from 'material-ui/TextField';

class TextEditor extends MuiComponent {
  componentDidMount() {
    this._editor = window.CKEDITOR.replace(this.props.id);
    window.CKEDITOR.instances[this.props.id].on('change', (e) => {
      this.props.onChange(e, e.editor.getData().trim());
    });
  }

  componentWillUnmount() {
    this._editor.destroy();
  }
  render() {
    return (
      <TextField id={ this.props.id }
        defaultValue={ this.props.defaultValue }
        multiLine fullWidth
        hintText={ this.props.hint }
      />
    );
  }
}

export default TextEditor;

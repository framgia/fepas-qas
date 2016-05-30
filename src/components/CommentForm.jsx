import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitComment } from '../actions/comments_action';

class CreateComment extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth) {
      this._editor = window.CKEDITOR.replace('new_answer');
      window.CKEDITOR.instances.new_answer.on('contentDom', (e) => {
        window.CKEDITOR.instances.new_answer.document.on('keyup', () => {
          Object.assign(this.props.data, {
            ['content']: e.editor.getData().trim()
          });
        });
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    Object.assign(this.props.data, {
      ['uid']: this.props.auth.uid,
      ['qid']: this.props.qid
    });
    this.props.submitComment(this.props.data);
  }

  render() {
    let viewCommentForm;
    const data = this.props.auth;
    if (data.uid) {
      viewCommentForm = (
        <form onSubmit={ this.handleSubmit }>
          Answer:
          <textarea rows={ '5' } cols={ '60' } id= { 'new_answer' } />
          <br />
          <input type="submit" value="Answer" />
        </form>
      );
    } else {
      viewCommentForm = (<p>Please login to answer</p>);
    }
    return viewCommentForm;
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, data: {} };
};

const mapDispatchToProps = {
  submitComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);

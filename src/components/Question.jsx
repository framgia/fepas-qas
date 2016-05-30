import React, { Component } from 'react';
import CommentForm from '../components/CommentForm';

class Question extends Component {
  renderTagLinks(tag) {
    if (tag) {
      return (
        <p>
          {tag.map((t) =>
            <a key={t} href={`questions?tag=${t}`}>#{t}, </a>
          )}
        </p>
      );
    }
    return '';
  }

  renderComments(comments) {
    if (comments) {
      comments.reverse().map((cmt) => {
        return (
          <li key={cmt.id}>{cmt.content}</li>
        );
      });
    }
    return '';
  }

  render() {
    const { question, uid } = this.props;
    const link = `questions/${uid}`;
    return (
      <div style={{ backgroundColor: '#9DB9E2' }}>
        <p>Title: <a href={link}>{question.title}</a></p>
        <p>Content: {question.content}</p>
        <div>Tags: {this.renderTagLinks(question.tag)}</div>
        <ul>Comments: {this.renderComments(question.comments)}</ul>
        <CommentForm qid={uid} />
      </div>
    );
  }
}

export default Question;

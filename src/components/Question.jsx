import React, { Component } from 'react';

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

  render() {
    const { question, uid } = this.props;
    const link = `questions/${uid}`;
    return (
      <div style={{ backgroundColor: '#9DB9E2' }}>
        <p>Title: <a href={link}>{question.title}</a></p>
        <p>Content: {question.content}</p>
        <div>Tags: {this.renderTagLinks(question.tag)}</div>
      </div>
    );
  }
}

export default Question;

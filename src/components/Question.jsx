import React from 'react';
import MuiComponent from '../components/MuiComponent';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

class Question extends MuiComponent {
  renderTagLinks(tag) {
    if (tag) {
      return (
        <div>
          {tag.map((t) =>
            <RaisedButton
              key={t} backgroundColor="#E1F5FE"
              linkButton href={`/questions?tag=${t}`}
              style={{ lineHeight: '24px', height: '24px', marginRight: '10px' }}
            >
              {t}
            </RaisedButton>
          )}
        </div>
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
      <div>
        <Subheader style={{ fontSize: '20px', paddingLeft: '0px' }}>
          <a href={link}>{question.title}</a>
        </Subheader>
        <div>{question.content}</div>
        <br />
        <div>{this.renderTagLinks(question.tag)}</div>
        <br />
        <div>Comments:
          <ul>{this.renderComments(question.comments)}</ul>
        </div>
      </div>
    );
  }
}

export default Question;

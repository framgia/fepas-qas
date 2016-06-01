import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class CircularProgressDeterminate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(1), 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({ completed: 100 });
    } else {
      this.setState({ completed });
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 500);
    }
  }

  render() {
    return (
      <div>
        <CircularProgress mode="determinate"
          value={this.state.completed} className="loading"
        />
      </div>
    );
  }
}

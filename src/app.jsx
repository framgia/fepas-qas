import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './components/toolbar.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <Toolbar />
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('main')
);

import React, { Component } from 'react';
import Task from './Task.js';

// step 2
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';

// step 3
import ReactDOM from 'react-dom';

// App component - represents the whole app

class App extends Component {

  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  getTasks() {
    return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input type="text" ref="textInput" placeholder="Type to add new tasks"/>
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);

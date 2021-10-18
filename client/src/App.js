import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

class App extends React.Component {

  state = {
    tasks: ['Buy some food', 'Make a dinner']
  }

  componentDidMount() {
    socket.open();
  }


  render() {
    // const tasks = [];

    const removeTask = id => {
      this.state.tasks.splice(id, 1);
      this.socket.emit('removeTask', id);
      console.log('działa');
      // this.setState({

      // })
    }
    return (
      <div className="App">

        <header>
          <h1>ToDoList.app</h1>
        </header>

        <section className="tasks-section" id="tasks-section">
          <h2>Tasks</h2>

          <ul className="tasks-section__list" id="tasks-list">
            {this.state.tasks
              .map(item => (
                <li key={item} className="task">{item}<button onClick={event => {
                  event.preventDefault();
                  return removeTask(item);
                }} className="btn btn--red">Remove</button></li>
              ))}
            {/* <li class="task">Shopping <button class="btn btn--red">Remove</button></li>
            <li class="task">Go out with a dog <button class="btn btn--red">Remove</button></li> */}
          </ul>

          <form id="add-task-form">
            <input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" />
            <button className="btn" type="submit">Add</button>
          </form>

        </section>
      </div>
    );
  };

};

App.propTypes = {
  id: PropTypes.string,
};

export default App;

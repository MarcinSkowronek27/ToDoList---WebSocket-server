import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';



class App extends React.Component {


  state = {
    tasks: ['Buy some food', 'Make a dinner', 'Bake a cake', 'Make a money'],
    taskName: ''
  }

  componentDidMount() {
    this.socket = io('http://localhost:8000');
    this.socket.on('addTask', (task) => this.addTask(task));
    this.socket.on('removeTask', (id) => this.removeTask(id));
    this.socket.on('updateData', (tasks) => this.updateTasks(tasks));
  };

  updateTasks = (tasks) => {
    this.state.tasks.push(tasks);
    // this.setState({
    //   tasks: tasks,
    // })
  }

  updateName = (event) => {
    // const inputValue = document.getElementsByClassName("text-input")[0].value;
    // console.log('inputValue', inputValue);
    // console.log('event:', event.target.value);
    this.setState({
      taskName: event.target.value,
    }, () => { console.log('wartość tablicy po update:', this.state.tasks) });
  };

  addTask = (task) => {
    this.state.tasks.push(task);
    // this.setState({
    //   tasks: newElem,
    // }, () => { console.log('wartość wypushowanej tablicy:', this.state.tasks)});
    console.log('pushTask:', this.state.tasks);
  };

  submitForm = (e) => {
    e.preventDefault();
    this.addTask(this.state.taskName);
    this.updateName(e);
    this.socket.emit('addTask', this.state.taskName);
    // console.log('działa Add');
  };

  // const tasks = [];

  removeTask = (id, location) => {
    // console.log('kliknięte id:', id);
    let filteredArray = this.state.tasks.filter(item => item !== id);
    // console.log('wynik testu:', filteredArray);
    // console.log('usuwany element:', this.state.tasks.splice(this.state.tasks.indexOf(id, 1)));

    this.setState({
      tasks: filteredArray,
    }, () => { console.log('wartość tablicy OK:', this.state.tasks) });
    if (location === 'local') {
      this.socket.emit('removeTask', id);
      console.log('działa lokalnie');
    }
    // console.log('działa Remove');
    // console.log('wartość tablicy:', this.state.tasks);
    // return filteredArray;
  }


  render() {

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
                  return this.removeTask(item, 'local');
                }} className="btn btn--red">Remove</button></li>
              ))}
            {/* <li class="task">Shopping <button class="btn btn--red">Remove</button></li>
            <li class="task">Go out with a dog <button class="btn btn--red">Remove</button></li> */}
          </ul>

          <form id="add-task-form" onSubmit={this.submitForm}>
            <input className="text-input" autoComplete="off" type="text" onChange={this.updateName} placeholder="Type your description" id="task-name" value={this.state.taskName} />
            <button className="btn" type="submit"
            >Add</button>
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

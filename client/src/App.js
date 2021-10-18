import React from 'react';
import PropTypes from 'prop-types';
// import io from 'socket.io-client';


class App extends React.Component {

  state = {
    tasks: ['Buy some food', 'Make a dinner', 'Bake a cake', 'Make a money'],
    taskName: []
  }

  // componentDidMount() {
  //   this.socket = io('http://localhost:8000');
  // }


  render() {
    // const tasks = [];
    console.log('początkowy stan:', this.state.tasks);
    const removeTask = id => {
      console.log('kliknięte id:', id);
      let test = this.state.tasks.filter(item => item !== id);
      console.log('wynik testu:', test);
      // console.log('usuwany element:', this.state.tasks.splice(this.state.tasks.indexOf(id, 1)));
      this.setState({
        tasks: test,
      }, () => { console.log('wartość tablicy OK:', this.state.tasks)});
      //  () => { console.log('wartość tablicy:', this.state.tasks); return this.state.tasks});
      // this.socket.emit('removeTask', id);
      // console.log('działa Remove');
      // console.log('wartość tablicy:', this.state.tasks);
      // return this.state.tasks;
    }

    const addTask = task => {
      this.state.tasks.push(task);
      console.log('pushTask:', this.state.tasks);
    };


    const updateState = () => {
      const inputValue = document.getElementsByClassName("text-input")[0].value;
      console.log('inputValue', inputValue);
      this.setState({
        taskName: inputValue,
      });
    };

    const submitForm = (e) => {
      e.preventDefault();
      addTask(this.state.taskName);
      // this.socket.emit('addTask', this.state.taskName);
      console.log('działa Add');
    };



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
            <input className="text-input" autoComplete="off" type="text" onChange={updateState} placeholder="Type your description" id="task-name" value={this.state.taskName} />
            <button className="btn" type="submit" onClick={submitForm}
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

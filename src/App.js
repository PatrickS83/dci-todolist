import React, { Component } from "react";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import base from "./base";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    // the ref is from firebase. Not react ref
    this.ref = base.syncState(`/todos`, {
      context: this,
      state: "todos", // which state you want to sync
      isArray: true
    });
  }

  addToDo = todoText => {
    const todos = [...this.state.todos];
    todos.push({ text: todoText, created: Date.now(), done: false });
    this.setState({ todos });
  };

  deleteToDo = todoID => {
    const todos = [...this.state.todos];
    const index = todos.findIndex(todo => todo.created === todoID);
    todos.splice(index, 1);
    this.setState({ todos });
  };

  markAsDone = todoID => {
    const todos = [...this.state.todos];
    const index = todos.findIndex(todo => todo.created === todoID);
    todos[index].done = !todos[index].done;
    this.setState({ todos });
  };

  moveItemUp = todoID => {
    const todos = [...this.state.todos];
    const index = todos.findIndex(todo => todo.created === todoID);
    const [todoItem] = todos.splice(index, 1);
    todos.splice(index - 1, 0, todoItem);
    this.setState({ todos });
  };

  render() {
    return (
      <div className="container">
        <h1>TODO - List</h1>
        <CreatePost addToDo={this.addToDo} />
        <PostList
          todoList={this.state.todos}
          deleteToDo={this.deleteToDo}
          markAsDone={this.markAsDone}
          moveItemUp={this.moveItemUp}
        />
      </div>
    );
  }
}

export default App;

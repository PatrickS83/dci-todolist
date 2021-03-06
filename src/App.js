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
    this.setState({ todos, filteredTodos: [] });
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

  // moves items in todolist up or down depending on "direction" parameter
  moveItem = (todoID, direction) => {
    const todos = [...this.state.todos];
    const index = todos.findIndex(todo => todo.created === todoID);
    const [todoItem] = todos.splice(index, 1);
    if (direction === "up") todos.splice(index - 1, 0, todoItem);
    else todos.splice(index + 1, 0, todoItem);
    this.setState({ todos });
  };

  filterList = () => {
    const path = this.props.history.location.pathname.substr(1);
    let filteredList = [...this.state.todos];
    if (path === "showDone")
      filteredList = filteredList.filter(todo => todo.done);
    if (path === "sortAsc")
      filteredList = filteredList.sort((a, b) => a.text.localeCompare(b.text));
    if (path === "sortDesc")
      filteredList = filteredList.sort((a, b) => b.text.localeCompare(a.text));
    return filteredList;
  };

  itemEdit = (e, index) => {
    const todos = [...this.state.todos];
    todos[index].text = e.target.value;
    this.setState({ todos });
  };

  render() {
    return (
      <div className="container">
        <h1>TODO - List</h1>
        <CreatePost addToDo={this.addToDo} />
        <PostList
          itemEdit={this.itemEdit}
          todoList={this.filterList()}
          deleteToDo={this.deleteToDo}
          markAsDone={this.markAsDone}
          moveItem={this.moveItem}
        />
      </div>
    );
  }
}

export default App;

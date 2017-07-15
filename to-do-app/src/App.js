import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "todos": [],
      "nextId": 1
    };
  }
  render() {
    let todosList = this.state.todos.map(todoListItem =>
    <li style= {todoListItem.done ? {backgroundColor : "green"} : {backgroundColor : "red"}}>
      {todoListItem.description}
      <input id = {"check" + todoListItem.toDoId} type="checkbox" checked = {todoListItem.done ? true : false} onChange={event => {
        let stateContainer = this.state;
        let itemIndex = stateContainer.todos.findIndex(todoListItem => "check" + todoListItem.toDoId == event.target.id );
        stateContainer.todos[itemIndex].done = event.target.checked;
        this.setState(stateContainer);
      }}/>{"done"}
      <button id= {"button" + todoListItem.toDoId} onClick= {event => {
        let stateContainer = this.state;
        let itemIndex = stateContainer.todos.findIndex(todoListItem => "button" + todoListItem.toDoId == event.target.id );
        stateContainer.todos = stateContainer.todos.slice(0,itemIndex).concat(stateContainer.todos.slice(itemIndex+1));
        this.setState(stateContainer);
      }}>Delete</button>
    </li>);
    return (
      <ul>
        {todosList}
      </ul>
    )
  }
  componentWillMount() {
    document.getElementById("addButton").addEventListener("click", () => {
      let newToDo = prompt("Please enter your new ToDo here", "Your new ToDo");
      if (newToDo) {
        let stateContainer = this.state;
        stateContainer.todos.push({
          "description": newToDo,
          "done": false,
          "toDoId": stateContainer.nextId
        });
        stateContainer.nextId++;
        this.setState(stateContainer);
      }
    });
  }
}
### Uncontrolled Components
``` html <input type="text" /> ```
In above React is not aware of wht user is typing, browser is incharge of the state

### Controlled Components
``` html <input type="text" value={this.state.inputText} /> ```
react is now in control of the state via this.state.inputText but here input cant be updated
hence

### Controlled Component with Update
``` javascript
<input
  type = "text"
  name = "inputText"
  value = {this.state.inputText}
  onChange = {(e) => {
    this.setState({inputText: e.target.value})
  }}
  />
  ```
  ## Form example
  ``` javascript
  handleForm(e){
    e.preventDefault(); //otherwise browser will default does XHR request and that changes over all state
    const data = [...this.state.data, this.state.inputText];
    this.setState({data, inputText:''});
  }
  
  <form onSubmit = {(e) => {handleForm}}>
    <input
      type = "text"
      name = "inputText"
      value = {this.state.inputText}
      onChange = {(e) => {
        this.setState({inputText: e.target.value})
      }}
    />
  </form>
  ```
Note : few people try not to use onSubmit instead they write a button and do onClick in the form .
Please remember a button's click is not same as onSubmit. Problem is there are lot of behaviours in browser that won't get covered by this click event.

## simple todo form
``` javascript

import React, { Component } from 'react';
import './App.css';

const TodoItem = (props) => {
  return <li> {props.text} </li>
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list : [],
      newElement : ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const list = [...this.state.list, this.state.newElement];
    this.setState({list, newElement:''});
  }
  render() {
    const todos = this.state.list.map((ele, i) => {
      return <TodoItem key={i} text={ele} />
    });
    return (
      <div className="App">
        <h2>Simple ToDo App</h2>
        <form className="form-part" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="inputText"
            value={this.state.newElement}
            onChange = {(e) => this.setState({newElement: e.target.value})}
          />
          <button type="submit">Save</button>
        </form>
        <div className="list-part">
          <ol>
            {todos}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;
```

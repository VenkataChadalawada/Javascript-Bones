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

//1. simple
import React, {Component} from 'react';
class Eventer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "tim"
    }
  }
  render(){
    return (
      <div>
        <p> Case Change - </p>
        <button type="button" onClick = {() => this.setState({name: "TIM"})}> {this.state.name} </button>
      </div>
    );
  }
}
export default Eventer;

//2. good setState example for pure functions
import React, {Component} from 'react';
class Eventer extends Component{
  constructor(props){
    super(props);
    this.state = {
      name:"tim"
    }
    this.handleEvent = this.handleEvent.bind(this); // why? - because this.setState we need this to get the context in that function
  }
  handleEvent(e){
    this.setState((prevState, props) => ({
      name:"TIM"
    });
  }
  // if you convert this to arrow you dont need to bind this
  const handleEventArrow = (e) => {
      this.setState((prevState, props) => ({
      name:"TIM"
    });
  }
  render(){
    return(
      <div>
        <p>{this.state.name}</p>
        <button type="button" onClick={this.handleEvent}>Upper Case</button>
        //people new to react world will make a common mistake here by calling like below which will immediately invoke the function -
        // without waiting for the event to happen
        <button type="button" onClick={this.handleEvent()}Upper Case</button>
        // just observe the paranthesis after handleClick which executes immediately but not until the event to happen
      </div>
    );
  }
}
export default Eventer;

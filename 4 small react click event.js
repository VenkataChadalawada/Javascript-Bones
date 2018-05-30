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

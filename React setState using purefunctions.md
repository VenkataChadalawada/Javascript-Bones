#setState

## In React we must use pure functions with out actually modifying state but with a clone
But there is a hiccup when we actually wanted a change in state which is at setState
eg:-
this.state = { counter: 1};

this.setState({
   counter : this.state.counter +1
   });
By doing this we think on third time counter becomes 3 ,4, 5.... But it wont it will be always 2 as everytime it gets the state it gets "1" 
from original state

So how to solve
Write in an Update way
eg:-
this.setState((prevState, props) => {
  retrun counter: prevState+1;
});

## setState is Asyncronous
this.setState({name:"Tim"});
//this wont happen yet
console.log(this.state.name);

Correct way is via  a call back in setState
this.setState({name:"Tim"}, () => {
//now state is uptodate
  console.log(this.state.name);
  });

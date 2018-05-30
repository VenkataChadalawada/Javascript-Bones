# Refs in React

- Managing focus, text selection or media playback
- Triggering imperative animations
- Integrating with third party DOM libraries

Do not use refs when the job can be done in react
you should not need direct DOM access for most tasks

//Ref simple example
``` javascript
<form onSubmit={(e) => {
  e.preventDefault();
  console.log(this.inputText.value);
}}>

  <input
     type="text"
     ref={(input) => this.inputText = input}
     />

</form>
```

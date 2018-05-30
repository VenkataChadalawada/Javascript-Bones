# Child component sometimes need to submit data which inturn need to be changing the main state that exist in parent
How can we accomplish this in React - Using call back functions

Lets Say we have RecipeApp as parent which has RecipeInput as child
Now parent should look like
Parent
``` javascript
.....
handleSave(recipe) {
    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: this.state.nextRecipeId};
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        showForm: false
      }
    });
  }
 ..... 
  
<RecipeInput onSave={this.handleSave} />
```
child
``` javascript
class RecipeInput extends Component {
  static defaultProps = {
    onSave() {}
  }
  ..... 
  //lets say it has got a form which has handleSubmit
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave({...this.state});
```

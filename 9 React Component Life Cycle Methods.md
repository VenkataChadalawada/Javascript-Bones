# React Component Life Cycle Methods

## Mounting
order of methods that gets executed
1)constructor()
2)componentWillMount()
3)render()
4)componentDidMount()

## UnMounting
1)componentWillUnMount()
// to clean up eg:- clean up the setInterval

## Updating
// this happens whenever setState is called
1)componentWillReciveProps(nextProps)
//if any props changes during setState
2)shouldComponentUpdate(nextProps,nextState)
// if you return false from this method the component will not render
//not recommended ; used to short circuit react render behaviour ; 
3)componentWillUpdate(nextProps, nextState)
// this executes right before render method gets called
4)render()
5)componentDidUpdate(prevProps, prevState)
//used for logging immediately after render

6)forceUpdate(callback)
skips componentShouldUpdate and forces a render. Should be avoided in most cases.

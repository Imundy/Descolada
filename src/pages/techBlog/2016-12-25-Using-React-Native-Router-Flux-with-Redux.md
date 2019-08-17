---
templateKey: tech-blog-post
title: Using React-Native-Router-Flux with Redux
date: 2016-12-25T15:04:10.000Z
featuredpost: false
featuredimage: /img/rnrf-image.png
description: If you’re coming to React Native from a web background like me, you’re probably familiar with React-Router. While looking for solutions on handling routing in my React Native applications, I came across React-Native-Router-Flux(RNRF) as a great solution.
tags:
  - react
  - react native
  - redux
  - reactjs
  - mobile app development
---

If you’re coming to React Native from a web background like me, you’re probably familiar with [React-Router](https://github.com/ReactTraining/react-router). While looking for solutions on handling routing in my React Native applications, I came across React-Native-Router-Flux(RNRF) as a great solution. It’s built on React Native’s `ExperimentalNavigation` API — a still unstable feature that you won’t have to worry about keeping your app up to date with.

Before going forward, I’ll assume you have some familiarity with Redux and React-Redux. If not, I suggest you go take a look at their [well written documentation.](http://redux.js.org/docs/introduction/index.html)

All credit here goes to the amazing authors and contributors of React-Native-Router-Flux. They already have less verbose documentation for RNRF+Redux on Github. This tutorial is not meant to replace that documentation, but rather as a supplement to provide some extra code if you’re still confused.

The source code for this example can be found [here.](https://github.com/Imundy/Rnrf-Example)

![RNRF App](/img/rnrf-example.gif)

## Setting up Redux

I’m making a heavily simplified to do and grocery list app (I just love beating dead horses), so some of this is probably really boring boilerplate. Feel free to skip it!

I have 3 reducer functions, but the most interesting for us is the `sceneReducer`.

```
//app/reducers/index.js
import { ActionConst } from 'react-native-router-flux';
const sceneReducer = (state = {}, {type, scene}) => {
    switch(type){
        case ActionConst.FOCUS:
            return { ...state, scene };
        default:
            return state;
    }
}
```

What is this doing? When we want to change `Scenes` — more on these later — this will receive the new `Scene` object, along with our current state, and cause the app to transtion. RNRF provides some [helpful constants](https://github.com/aksonov/react-native-router-flux/blob/master/src/ActionConst.js) in the `ActionConst` export, including `FOCUS`.

Other than that, I use the `combineReducers` function to export one reducer for the `createStore` function to consume. I’m not doing anything middleware makes sense for, so Store creation is very simple.

```
const store = createStore(appReducer);
```

## Setting the Scene

`Scenes` are the building blocks of our RNRF routing. A `Scene` can be defined roughly as a screen in our application. This is the part that will start looking familiar if you've seen other routing libraries that use JSX to define their tables. In the `index.js` file, I have defined our scenes like so:

```
const Scenes = Actions.create(
  <Scene key='root'>
    <Scene key='lists' tabs={true} hideNavBar type=      {ActionConst.REPLACE}>
            <Scene key='tab1' title='Add' component={Lists} icon={TabIcon}></Scene>
            <Scene key='tab2' title='Grocery' component={GroceryList} icon={TabIcon}></Scene>
            <Scene key='tab3' title='To Do' component={TodoList} icon={TabIcon}></Scene>
        </Scene>
        <Scene
          key='everything' component={Everything} hideNavBar type={ActionConst.REPLACE}></Scene>
    </Scene>
);
```

A few things about this:

- Each Scene takes a component to render.
- The exception to this is our encapsulating scenes. For example we have a `lists` Scene that contains 3 children. The `tabs` prop indicates that RNRF should show a tabbed navigation for the group.
- The `type` prop indicates what should happen when this scene is navigated to. The default is usually `Push`, but I have chosen to override it to not blow up the app\* :)
- We're defining Scenes as a static variable to avoid a flood of warnings \* about keys already being defined.

The entire RNRF API documentation can be found [here](https://github.com/aksonov/react-native-router-flux/blob/master/docs/API_CONFIGURATION.md).

## Connecting RNRF to Redux

First the code.

```
//index.js
import { Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
const ConnectedRouter = connect()(Router);
const store = createStore(appReducer);
export default class RnrfExample extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter scenes={Scenes} />
      </Provider>
    );
  }
}
```

The `ConnectedRouter` is a simple container component for the Router component provider by RNRF. After that it's as simple as using Provider to pass the store down through our component tree. And 💥 we have connected Redux to React-Native-Router-Flux.

## Changing Scenes

Changing Scenes becomes simple once we've got that all set up. Let's look at the render function of our `lists.js` to see it.

```
//import { Actions } from 'react-native-router-flux';
<TouchableHighlight
    style={styles.button}
    onPress={() => { Actions.everything(); }}>
    <Text style={styles.buttonText}>See everything!</Text>
</TouchableHighlight>
```

If you look at our scene definitions, we have one scene with `key='everything'`. Here we only need to call `Actions.everything()` to navigate to that scene. Calling these methods will dispatch an action to our scene reducer with the `ActionConst.FOCUS` type. These function calls can also take optional parameters like `Actions.everything({title: 'Gotta catch em all'});` Here's a gif!

![RNRF nav example](/img/rnrf-nav-example.gif)

## Extras

- If you're using tabbed navigation (the `tabs` prop), make sure that the children define a `tabIcon` component. Otherwise, you will be very sad when you don't see your tabs.
- I'm hiding the `navBar` in my examples, but it provides some great out of the box functionality for navigating through a stack of scenes. You may find it useful, but also know that you can define your own navBar to provide the same functionality if it won't work for you.
- Earlier I mentioned not blowing up my app - It was failing due to a duplicate key exception. If you cause 2 scenes to be pushed onto the stack with same key, RNRF will not be happy. This is why I used `type={ActionConst.REPLACE}` for navigating between the two scenes under root.
- My reducer composition and structure is probably not perfect. Don't judge my example too hard :) - but I would love any feedback or suggestions for improving the example!

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import Pokedex from './Pokedex'
import Pokemon from './Pokemon'


function App() {
  return (
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />} />
      <Route
        exact path="/:pokemonId"
        render={(props) => <Pokemon {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;

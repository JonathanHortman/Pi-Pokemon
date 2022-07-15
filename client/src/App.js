import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddPokemon from './components/AddPokemon';
import LandingPage from './components/LandingPage';
import PokemonDetail from './components/PokemonDetail';
import Home from './components/Home';
import Error404 from './components/Error404';

function App() {


  return (
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>

          <Route exact path='/home/pokemon/:idPokemon'>
           <PokemonDetail />
          </Route>

          <Route exact path='/home'>
            <Home />
          </Route>

          <Route exact path='/home/add'>
            <AddPokemon />
          </Route>

          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>
      </div>
  );
}

export default App;

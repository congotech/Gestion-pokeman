import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import PokemonList from './pages/pokemon-list';
import PokemonsDetail from './pages/pokemon-details';
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';
import PokemonAdd from './pages/pokemon-add';
import Login from './pages/login';
import PrivateRoute from './PrivateRoute';

const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">Pokédex</Link>
          </div>
        </nav>
        
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          
          {/* Routes protégées */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemons" element={<PokemonList />} />
            <Route path="/pokemons/:id" element={<PokemonsDetail />} />
            <Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
            <Route path="/pokemon/add" element={<PokemonAdd />} />
          </Route>

          {/* Route 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
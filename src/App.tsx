import React, { FunctionComponent } from 'react';
import PokemonList from './pages/pokemon-list';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-details';
import PageNotFound from './pages/page-not-found';
import PokemonEdit from './pages/pokemon-edit';

const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        {/* La barre de navigation commune à toutes les pages */}
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">Pokédex</Link>
          </div>
        </nav>
        {/* Le système de gestion des routes de notre application */}
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemons" element={<PokemonList />} />
          <Route path="/pokemons/:id" element={<PokemonsDetail />} />
          <Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';
import { Link, useNavigate } from 'react-router-dom';
import PokemonSearch from '../components/pokemon-search';
import AuthenticationService from '../services/authentication-service';
  
const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    PokemonService.getPokemons().then(pokemons => setPokemons(pokemons));
  }, []);

  const handleLogout = () => {
    AuthenticationService.logout();
    navigate('/login');
  }
  

  
  return (
    <div>
     {/* Bouton de déconnexion */}
     <div className="right-align" style={{padding: '10px'}}>
        <button 
          onClick={handleLogout}
          className="btn-floating btn-large waves-effect waves-light red"
          style={{position: 'fixed', top: '20px', right: '20px'}}
        >
          <i className="material-icons">logout</i>
        </button>
      </div>
      <h1 className="center">Pokédex</h1>
      <div className="container"> 
        <div className="row"> 
        <PokemonSearch />
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
        </div>
        <Link className="btn-floating btn-large waves-effect waves-light red z-depth-3"
          style={{position: 'fixed', bottom: '25px', right: '25px'}}
          to="/pokemon/add"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div> 
  );
}
  
export default PokemonList;
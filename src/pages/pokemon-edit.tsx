import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import PokemonService from '../services/pokemon-service';
import Pokemon from '../models/pokemon';
import Loader from '../components/loader';

  
const PokemonEdit: FunctionComponent = () => {
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
   const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    if(id) {
      PokemonService.getPokemon(parseInt(id))
          .then(pokemon => setPokemon(pokemon));
  }
  }, [id]);
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center"><Loader></Loader></h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;
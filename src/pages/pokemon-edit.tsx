import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import POKEMONS from '../models/mock-pokemon';
 
type Params = { id: string };
  
const PokemonEdit: FunctionComponent = () => {
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
   const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    POKEMONS.find(pokemon => {
      if (id === pokemon.id.toString()) {
        setPokemon(pokemon);
      }
    })
  }, [id]);
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;
import React, { FunctionComponent, useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';
import { useNavigate } from 'react-router-dom';
import PokemonService from '../services/pokemon-service';
  
type Props = {
  pokemon: Pokemon,
  isEditForm: boolean
};

type Form = {
    picture:Fields,
    name: Fields,
    hp: Fields,
    cp: Fields,
    types: Fields
  }

type Fields = {
    value: any,
    error?: string,
    isValid?: boolean
  }

const PokemonForm: FunctionComponent<Props> = ({pokemon, isEditForm}) => {
  
  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

const [form, setForm] = useState<Form>({
    picture: {value: pokemon.picture},
    name: { value: pokemon.name, isValid: true},
    hp: { value: pokemon.hp, isValid: true},
    cp: { value: pokemon.cp, isValid: true},
    types: { value: pokemon.types, isValid: true},
});

const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
}

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Fields = { 
        value: fieldValue,  // Ajout de la propriété value
        isValid: true,      // Ajout de isValid par défaut
        error: ''          // Optionnel : ajout d'une erreur vide par défaut
      };
      setForm({
        ...form,
        [fieldName]: newField  // Utiliser la notation [] pour mettre à jour le bon champ
    });
}

const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
  const checked = e.target.checked;
  let newField: Fields;

  if(checked){
    //Si l'utilisateur coche un type, on l'ajoute à la liste des types du pokémon.
    const newTypes: string[] = form.types.value.concat([type]);
    newField = { value: newTypes };
  }else {
    //Si l'utilisateur décoche un type, on le retire de la liste des types pokémon.
    const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !==type);
    newField = { value: newTypes};
  }

  setForm({...form, ...{ types: newField}});
}


const isAddForm = () => {
  return !isEditForm;
}


const validationForm = () => {
  let newForm: Form = form;

  //validator url
  if(isAddForm()) {
    const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
    const end = ".png";

    if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)){
      const erroMsg: string = "L'url n'est pas valide.";
      const newField: Fields = { value: form.picture.value, error: erroMsg, isValid: false};
      newForm = { ...form, ...{ picture: newField }};
    } else {
      const newField: Fields = { value: form.picture.value, error: '', isValid: true};
      newForm = { ...form, ...{ picture: newField }};
    }
  }

  //validator name
  if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)){
    const errorMsg: string = 'Le nom du pokémon est requis (1-25).';
    const newField: Fields = { value: form.name.value, error: errorMsg, isValid: false};
    newForm = {...newForm, ...{ name: newField}};
  }else{
    const newField: Fields = { value: form.name.value, error: '', isValid: true};
    newForm = { ...newForm, ...{ name: newField}};
  }

  //validator hp
  if(!/^[0-9]{1,3}$/.test(form.hp.value)){
    const errorMsg: string = 'Les points de vie du pokémon sont compris entre 0 et 999.';
    const newFields: Fields = {value: form.hp.value, error: errorMsg, isValid: false};
    newForm = { ...newForm, ...{hp: newFields}};
  }else{
    const newFields: Fields = { value: form.hp.value, error: '', isValid: true}
    newForm = { ...newForm, ...{ hp: newFields}};
  }

  //Validator cp
  if(!/^[0-9]{1,2}$/.test(form.cp.value)){
    const errorMsg: string = 'Les dégats du pokémon sont compris entre 0 et 99.';
    const newFields: Fields = {value: form.cp.value, error: errorMsg, isValid: false};
    newForm = { ...newForm, ...{cp: newFields}};
  }else{
    const newFields: Fields = { value: form.cp.value, error: '', isValid: true}
    newForm = { ...newForm, ...{ cp: newFields}};
  }

  setForm(newForm);
  return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
}

const isTypesValid = (type: string): boolean => {
  if(form.types.value.length === 1 && hasType(type)){
    return false;
  }

  if(form.types.value.length >= 3 && !hasType(type)){
    return false;
  }

  return true;
}

const navigate = useNavigate();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const isFormValid = validationForm();

  if(isFormValid){

    pokemon.picture = form.picture.value;
    pokemon.name = form.name.value;
    pokemon.hp = form.hp.value;
    pokemon.cp = form.cp.value;
    pokemon.types = form.types.value;
    
    isEditForm ? updatePokemon() : addPokemon();
  }
}

const addPokemon = () => {
  PokemonService.addPokemon(pokemon).then(() => navigate('/pokemons'));
}

const updatePokemon = () => {
  PokemonService.updatePokemon(pokemon).then(() => navigate('/pokemons'));
}

const deletePokemon = () => {
  PokemonService.deletePokemeon(pokemon).then(() => navigate(`/pokemons/`));
} 


  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
          {isEditForm && ( 
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
              <span className='btn-floating halfway-fab waves-effect waves-light'>
                <i 
                  onClick={deletePokemon} 
                  className='materials-icons'
                  style={{
                    fontSize: '12px',
                    lineHeight: '40px',
                    width: '30%',
                    textAlign: 'center',
                    display: 'block'
                  }}
                >
                  delete
                </i>
              </span>
            </div>
          )}
            <div className="card-stacked">
              <div className="card-content">
                 {/* Pokemon picture */}
                 {isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="name">Image</label>
                    <input id="name" name='picture' type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>
                    {
                      form.picture.error &&
                      <div className='card-panel red accent-1'>
                        {form.picture.error}
                      </div>
                    }
                  </div>
                )}
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name='name' type="text" className="form-control" value={form.name.value} onChange={e => handleInputChange(e)}></input>
                  {
                    form.name.error &&
                    <div className='card-panel red accent-1'>
                      {form.name.error}
                    </div>
                  }
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" name='hp' type="number" className="form-control" value={form.hp.value} onChange={e => handleInputChange(e)}></input>
                  {
                    form.hp.error &&
                    <div className='card-panel red accent-1'>
                      {form.hp.error}
                    </div>
                  }
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" name='cp' type="number" className="form-control" value={form.cp.value} onChange={e => handleInputChange(e)}></input>
                  {
                    form.cp.error &&
                    <div className='card-panel red accent-1'>
                      {form.cp.error}
                    </div>
                  }
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypesValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default PokemonForm;
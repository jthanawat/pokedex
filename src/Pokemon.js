import React, { useState, useEffect } from 'react'
import { Typography, Link, CircularProgress, Button } from '@material-ui/core';
import { toFirstCharUpperCase } from './constants'
import axios from 'axios'

const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setPokemon(data);
        console.log(data)
      })
      .catch((err) => {
        setPokemon(false)
      })
    }, [])


    // 1.pokemon=undefined, that means we're getting the info
    // -> return loading progress
    // 2. pokemon  good data, that means we've gotten info
    // -> return actual info
    // 3. pokemon = bad data / false
    // -> return pokemon not found

    const generatePokemonJSX = () => {
      const { name, id, species, height, weight, types, sprites } = pokemon;
      // console.log(pokemon)
      const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
      const { front_default } = sprites;

      return (
        <>
          <Typography variant="h1">
            {`${id}.`} {toFirstCharUpperCase(name)}
            <img src={front_default} />
          </Typography>
          <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
          <Typography variant="h3">Pokemon Info</Typography>
          <Typography>
            Species:
          <Link href={species.url}> {species.name} </Link>
          </Typography>
          <Typography>Height: {height}</Typography>
          <Typography>Weight: {weight}</Typography>
          <Typography variant="h6"> Types: </Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return <Typography key={name}> {`${name}`} </Typography>
          }
          )}
        </>
      )
    }


    return (<>

      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography> Pokemon not found </Typography>}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          BACK TO POKEDEX</Button>
      )}

    </>
    )
  }

export default Pokemon;
import React from 'react'

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
const {pokemonId } = params;
  return (
    <div>
      {`This is Pokemon Page for pokemon #${pokemonId}`}
  </div>
  )

}

export default Pokemon;
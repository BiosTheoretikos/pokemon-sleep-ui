import React from 'react';

import {NextImage} from '@/components/shared/common/image/main';
import {PokemonImageType} from '@/components/shared/pokemon/image/type';
import {imagePortraitSizes} from '@/styles/image';
import {PokemonId} from '@/types/game/pokemon';


type Props = {
  pokemonId: PokemonId | null,
  image: PokemonImageType,
  isShiny: boolean,
  alt?: string,
};

export const PokemonImage = ({pokemonId, image, isShiny, alt}: Props) => {
  if (!pokemonId) {
    return (
      <NextImage src="/images/generic/pokeballUnavailable.png" alt="N/A" sizes={imagePortraitSizes}/>
    );
  }

  const actualAlt = alt ?? `Pokemon #${pokemonId}`;

  if (image === 'portrait') {
    return (
      <NextImage
        src={`/images/pokemon/portrait/${isShiny ? 'shiny/' : ''}${pokemonId}.png`}
        alt={actualAlt}
        sizes={imagePortraitSizes}
      />
    );
  }

  if (image === 'icon') {
    return (
      <NextImage
        src={`/images/pokemon/icons/${pokemonId}.png`}
        alt={actualAlt}
        sizes={imagePortraitSizes}
      />
    );
  }

  return (
    <NextImage
      src={`/images/sleep/${image}/${isShiny ? 'shiny/' : ''}${pokemonId}.png`}
      alt={actualAlt}
      sizes={imagePortraitSizes}
    />
  );
};

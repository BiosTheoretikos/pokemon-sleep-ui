import React from 'react';

import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {PokemonIconList} from '@/components/shared/pokemon/icon/list';
import {MapTableInfoIcon} from '@/components/shared/sleepStyle/page/unlockTable/infoIcon';
import {MapUnlockTableRowProps} from '@/components/shared/sleepStyle/page/unlockTable/type';
import {useUpdateSleepdex} from '@/hooks/sleepdex/update';
import {isInSleepdex, toSleepdexStyleId} from '@/utils/game/sleepdex';


export const MapUnlockTablePokemonIcons = ({
  pokedexMap,
  filter,
  matchingStyles,
  sleepdex,
  setSleepdex,
}: MapUnlockTableRowProps) => {
  const {displayType, markingSleepdex, showLockedOnly} = filter;

  const updateSleepdex = useUpdateSleepdex({sleepdex, setSleepdex});

  return (
    <Flex center>
      <PokemonIconList
        dataWithPokemon={matchingStyles.map((data) => ({
          ...data,
          show: showLockedOnly || !isInSleepdex({
            pokemonId: data.pokemonId,
            styleId: data.style.style,
            sleepdex,
          }),
        }))}
        getPokemon={({pokemonId}) => pokedexMap[pokemonId]}
        getPokemonId={({pokemonId}) => pokemonId}
        getInfo={(data) => (
          <MapTableInfoIcon data={data} pokedex={pokedexMap} displayType={displayType}/>
        )}
        getClassName={({pokemonId, style}) => clsx(
          'm-0.5',
          sleepdex[toSleepdexStyleId({pokemonId, styleId: style.style})] && 'bg-corner-mark',
        )}
        getShow={({show}) => !!show}
        getReactKey={({pokemonId, style}) => `${pokemonId}-${style.style}`}
        onClickOverride={
          markingSleepdex ?
            ({pokemonId, style}) => updateSleepdex({pokemonId, styleId: style.style}) :
            undefined
        }
      />
    </Flex>
  );
};

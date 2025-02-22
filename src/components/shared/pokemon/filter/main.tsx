import React from 'react';

import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterIconInput} from '@/components/input/filter/preset/icon';
import {FilterTextInput} from '@/components/input/filter/preset/text';
import {FilterInclusionMap, FilterWithUpdaterProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex/common';
import {PokemonFilterTitle} from '@/components/shared/pokemon/filter/title';
import {
  EvolutionStageSelection,
  ingredientLevelToPokemonInput,
  PokemonInputFilter,
} from '@/components/shared/pokemon/filter/type';
import {getFilterIdsFromPokemon} from '@/components/shared/pokemon/filter/utils';
import {PokemonIngredientFilter} from '@/components/shared/pokemon/ingredients/filter';
import {PokemonIngredientTypeTitle} from '@/components/shared/pokemon/ingredients/typeTitle';
import {PokemonSleepType} from '@/components/shared/pokemon/sleepType/main';
import {PokemonSpecialty} from '@/components/shared/pokemon/specialty/main';
import {textFilterButtonStyle} from '@/styles/input';
import {BerryId} from '@/types/game/berry';
import {IngredientId} from '@/types/game/ingredient';
import {PokemonInfo, PokemonSleepTypeId, PokemonSpecialtyId, PokemonTypeId} from '@/types/game/pokemon';
import {IngredientChainMap, ingredientLevels} from '@/types/game/pokemon/ingredient';
import {MainSkillId} from '@/types/game/pokemon/mainSkill';
import {KeysOfType} from '@/utils/type';


type Props<TFilter extends PokemonInputFilter> = FilterWithUpdaterProps<TFilter> & {
  pokemonList: PokemonInfo[],
  ingredientChainMap: IngredientChainMap,
  className?: string,
};

export const PokemonFilter = <TFilter extends PokemonInputFilter>({
  pokemonList,
  ingredientChainMap,
  className,
  ...props
}: Props<TFilter>) => {
  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex.Input');

  return (
    <Flex className={clsx('gap-1', className)}>
      <FilterIconInput
        title={<PokemonFilterTitle type="pokemonType"/>}
        idToAlt={(id) => t(`PokemonType.${id}`)}
        idToImageSrc={(id) => `/images/type/${id}.png`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({type}) => type,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'pokemonType' as KeysOfType<TFilter, FilterInclusionMap<PokemonTypeId>>,
        })}
      />
      <FilterExpandedInput
        title={<PokemonFilterTitle type="specialty"/>}
        idToButton={(id, isActive) => <PokemonSpecialty specialty={id} active={isActive}/>}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({specialty}) => specialty,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'specialty' as KeysOfType<TFilter, FilterInclusionMap<PokemonSpecialtyId>>,
        })}
        className={textFilterButtonStyle}
      />
      <FilterExpandedInput
        title={<PokemonFilterTitle type="sleepType"/>}
        idToButton={(id, isActive) => <PokemonSleepType sleepType={id} active={isActive}/>}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({sleepType}) => sleepType,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'sleepType' as KeysOfType<TFilter, FilterInclusionMap<PokemonSleepTypeId>>,
        })}
        className={textFilterButtonStyle}
      />
      {ingredientLevels.map((level) => (
        <PokemonIngredientFilter
          key={level}
          title={<PokemonIngredientTypeTitle level={level} lvAsText/>}
          ingredientChainMap={ingredientChainMap}
          level={level}
          {...getMultiSelectOnClickProps({
            ...props,
            filterKey: ingredientLevelToPokemonInput[level] as KeysOfType<TFilter, FilterInclusionMap<IngredientId>>,
          })}
        />
      ))}
      <FilterIconInput
        title={<PokemonFilterTitle type="berry"/>}
        idToAlt={(id) => t(`Berry.${id}`)}
        idToImageSrc={(id) => `/images/berry/${id}.png`}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({berry}) => berry.id,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'berry' as KeysOfType<TFilter, FilterInclusionMap<BerryId>>,
        })}
      />
      <FilterExpandedInput
        title={<PokemonFilterTitle type="evolutionStage"/>}
        idToButton={(id) => (
          <div className="mx-1">
            {id === 'final' ? t2('FinalEvolution') : id}
          </div>
        )}
        ids={[
          ...getFilterIdsFromPokemon({
            pokemonList,
            toId: ({evolution}) => evolution.stage,
          }),
          'final',
        ] satisfies EvolutionStageSelection[]}
        className={textFilterButtonStyle}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'evolutionStage' as KeysOfType<TFilter, FilterInclusionMap<EvolutionStageSelection>>,
        })}
      />
      <FilterTextInput
        title={<PokemonFilterTitle type="mainSkill"/>}
        idToText={(id) => t(`MainSkill.Name.${id}`)}
        ids={getFilterIdsFromPokemon({
          pokemonList,
          toId: ({skill}) => skill,
        })}
        {...getMultiSelectOnClickProps({
          ...props,
          filterKey: 'mainSkill' as KeysOfType<TFilter, FilterInclusionMap<MainSkillId>>,
        })}
      />
    </Flex>
  );
};

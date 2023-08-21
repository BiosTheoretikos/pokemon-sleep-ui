import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import InformationCircleIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterTextInput} from '@/components/input/filter/text';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex';
import {PokemonFilter} from '@/components/shared/pokemon/input/filter';
import {PokemonMapFilter} from '@/components/shared/pokemon/input/mapFilter';
import {pokemonInputType} from '@/components/shared/pokemon/input/type';
import {PokemonLevelSlider} from '@/components/shared/pokemon/levelSlider';
import {PokemonSortingPicker} from '@/components/shared/pokemon/sorter/picker';
import {PokedexInputClearer} from '@/ui/pokedex/index/input/clearer';
import {displayTypeToI18nId} from '@/ui/pokedex/index/input/const';
import {pokedexDisplayType, PokedexInputProps} from '@/ui/pokedex/index/input/type';
import {PokedexClientCommonProps} from '@/ui/pokedex/index/type';
import {toUnique} from '@/utils/array';


type Props = PokedexInputProps & PokedexClientCommonProps;

export const PokedexInput = ({pokedex, maxLevel, ...props}: Props) => {
  const {filter, setFilter, session} = props;
  const t = useTranslations('UI.InPage.Pokedex');
  const collapsible = useCollapsible();

  return (
    <div className="relative">
      <Collapsible state={collapsible} className="h-72 md:h-52" button={
        <Flex direction="row" center className="gap-0.5">
          <div className="h-6 w-6">
            <FunnelIcon/>
          </div>
        </Flex>
      }>
        <div className="absolute bottom-2 right-6 z-10">
          <PokedexInputClearer setFilter={setFilter} session={session}/>
        </div>
        <Flex direction="col" className="gap-1 pr-1">
          <PokemonMapFilter
            highlight
            mapIds={toUnique(pokedex
              .flatMap(({sleepStyles}) => sleepStyles.map(({mapId}) => mapId)))
              .sort((a, b) => a - b)}
            {...getMultiSelectOnClickProps({
              filter,
              setFilter,
              filterKey: 'mapId',
            })}
          />
          <InputRowWithTitle title={t('Info.Name')}>
            <InputBox type="text" value={filter.name} onChange={({target}) => setFilter((original) => ({
              ...original,
              name: target.value,
            }))}/>
          </InputRowWithTitle>
          {pokemonInputType.map((type) => (
            <PokemonFilter
              key={type}
              style={type === 'sleepType' || type === 'ingredientFixed' ? 'highlight' : 'normal'}
              type={type}
              filterKey={type}
              pokemon={pokedex}
              {...props}
            />
          ))}
          <InputRow>
            <Flex direction="col" className="p-1">
              <PokemonLevelSlider level={filter.level} maxLevel={maxLevel}
                setLevel={(level) => setFilter((original) => ({
                  ...original,
                  level,
                } satisfies PokedexInputProps['filter']))}/>
            </Flex>
          </InputRow>
          <FilterTextInput
            onClick={(display) => setFilter((original) => ({
              ...original,
              display,
            } satisfies PokedexInputProps['filter']))}
            isActive={(display) => filter.display === display}
            title={
              <Flex direction="row" center>
                <div className="h-6 w-6">
                  <InformationCircleIcon/>
                </div>
              </Flex>
            }
            ids={[...pokedexDisplayType]}
            idToButton={(display) => t(displayTypeToI18nId[display])}
            idToItemId={(display) => `displayType-${display}`}
          />
          <PokemonSortingPicker
            sort={filter.sort}
            updateSort={(sort) => setFilter((original) => ({
              ...original,
              sort,
            } satisfies PokedexInputProps['filter']))}
          />
        </Flex>
      </Collapsible>
    </div>
  );
};

import React from 'react';

import RocketLaunchIcon from '@heroicons/react/24/outline/RocketLaunchIcon';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import EyeSlashIcon from '@heroicons/react/24/solid/EyeSlashIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';

import {InputBox} from '@/components/input/box';
import {InputRow} from '@/components/input/filter/row';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {FilterInputProps} from '@/components/input/filter/type';
import {ToggleButton} from '@/components/input/toggleButton';
import {Flex} from '@/components/layout/flex/common';
import {NumberSliderRequired} from '@/components/shared/input/number/required/withSlider';
import {PokemonClickableIconImage} from '@/components/shared/pokemon/icon/clickable/image';
import {PokemonClickableIcons} from '@/components/shared/pokemon/icon/clickable/main';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {PokemonNatureSelector} from '@/components/shared/pokemon/nature/selector/main';
import {defaultExpType} from '@/const/game/xp';
import {textFilterButtonStyle} from '@/styles/input';
import {PokemonExpCalculatorDataProps, PokemonExpCalculatorInput} from '@/ui/xp/type';
import {isNotNullish} from '@/utils/type';


type Props = PokemonExpCalculatorDataProps & FilterInputProps<PokemonExpCalculatorInput> & {
  maxLevel: number,
};

export const PokemonExpCalculatorInputUI = ({
  pokedexMap,
  filter,
  setFilter,
  maxLevel,
}: Props) => {
  const {
    currentLv,
    xpToNext,
    ownedCandies,
    rate,
    pokemon,
    nature,
    showNonBreakthroughLevel,
  } = filter;

  const t = useTranslations('UI.InPage.PokemonExp');

  return (
    <Flex className="info-section">
      <PokemonClickableIcons
        pokemonList={Object
          .values(pokedexMap)
          .filter(isNotNullish)
          .filter(({expType}) => expType !== defaultExpType)}
        isActive={(id) => id === pokemon}
        onClick={({id}) => setFilter((original) => ({
          ...original,
          pokemon: id,
        } satisfies PokemonExpCalculatorInput))}
      >
        {(getClassName) => (
          <button className={getClassName(pokemon === null)} onClick={() => setFilter((original) => ({
            ...original,
            pokemon: null,
          }))}>
            <PokemonClickableIconImage pokemon={null} dimension="h-14 w-14"/>
          </button>
        )}
      </PokemonClickableIcons>
      <PokemonLevelSlider
        max={maxLevel}
        value={currentLv}
        setValue={(currentLv) => setFilter((original) => ({
          ...original,
          currentLv,
        }))}
      />
      <InputRowWithTitle noFixedTitleWidth title={
        <Flex noFullWidth center className="w-60">
          {t('ExpToNext')}
        </Flex>
      }>
        <InputBox
          type="number"
          value={xpToNext.toString()}
          onChange={({target}) => setFilter((original) => ({
            ...original,
            xpToNext: parseInt(target.value || '0'),
          }))}
        />
      </InputRowWithTitle>
      <InputRowWithTitle noFixedTitleWidth title={
        <Flex noFullWidth center className="w-60">
          {t('OwnedCandies')}
        </Flex>
      }>
        <InputBox
          type="number"
          value={ownedCandies.toString()}
          onChange={({target}) => setFilter((original) => ({
            ...original,
            ownedCandies: parseInt(target.value || '1'),
          }))}
        />
      </InputRowWithTitle>
      <PokemonNatureSelector
        nature={nature}
        setNature={(nature) => setFilter((original) => ({
          ...original,
          nature,
        }))}
        classNameForHeight="h-8"
      />
      <NumberSliderRequired
        text={t('Multiplier.ExpBoost')}
        value={rate.candyExpBoost}
        setValue={(candyExpBoost) => setFilter(({rate, ...original}) => ({
          ...original,
          rate: {
            ...rate,
            candyExpBoost,
          },
        }))}
        max={5}
        noSameLine
      />
      <NumberSliderRequired
        text={t('Multiplier.DreamShardDepletion')}
        value={rate.dreamShardDepletion}
        setValue={(dreamShardDepletion) => setFilter(({rate, ...original}) => ({
          ...original,
          rate: {
            ...rate,
            dreamShardDepletion,
          },
        }))}
        max={10}
        noSameLine
      />
      <InputRow className="justify-end gap-2">
        <ToggleButton
          active={showNonBreakthroughLevel}
          onClick={() => setFilter((original) => ({
            ...original,
            showNonBreakthroughLevel: !original.showNonBreakthroughLevel,
          } satisfies PokemonExpCalculatorInput))}
          className={clsx('group', textFilterButtonStyle)}
        >
          <Flex direction="row" center noFullWidth className="gap-1.5 p-1">
            <div className="h-5 w-5">
              {showNonBreakthroughLevel ? <EyeIcon/> : <EyeSlashIcon/>}
            </div>
            <RocketLaunchIcon className="h-5 w-5"/>
          </Flex>
        </ToggleButton>
      </InputRow>
    </Flex>
  );
};

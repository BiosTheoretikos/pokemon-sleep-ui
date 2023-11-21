import React from 'react';

import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import BookmarkIcon from '@heroicons/react/24/solid/BookmarkIcon';
import {clsx} from 'clsx';
import {useTranslations} from 'next-intl';
import AutoSizer from 'react-virtualized-auto-sizer';
import {FixedSizeGrid} from 'react-window';

import {InfoIcon} from '@/components/icons/info';
import {InputBox} from '@/components/input/box';
import {InputRowWithTitle} from '@/components/input/filter/rowWithTitle';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Collapsible} from '@/components/layout/collapsible/main';
import {Flex} from '@/components/layout/flex/common';
import {IconWithInfo} from '@/components/shared/common/image/iconWithInfo';
import {NextImage} from '@/components/shared/common/image/main';
import {FeatureLinkImage} from '@/components/shared/link/featureImage';
import {usePokeboxImporterFilter} from '@/components/shared/pokebox/importer/filter';
import {PokeboxImporterCommonProps, PokeInBoxForFilter} from '@/components/shared/pokebox/importer/type';
import {PokemonFilter} from '@/components/shared/pokemon/filter/main';
import {PokemonNatureIndicator} from '@/components/shared/pokemon/nature/indicator/main';
import {PokemonSubSkillIndicator} from '@/components/shared/pokemon/subSkill/indicator';
import {pokeInBoxFavoriteStyle} from '@/styles/game/pokebox';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {PokeInBox} from '@/types/game/pokebox';
import {isNotNullish} from '@/utils/type';


type Props = PokeboxImporterCommonProps & {
  pokebox: PokeInBox[],
};

export const PokeboxImporterView = ({
  pokedexMap,
  subSkillMap,
  ingredientChainMap,
  onPokeboxPicked,
  pokebox,
}: Props) => {
  const t = useTranslations('UI.Metadata.Team');
  const t2 = useTranslations('Game');
  const t3 = useTranslations('UI.Common');
  const t4 = useTranslations('UI.InPage.Pokedex');

  const {
    filter,
    setFilter,
    isIncluded,
  } = usePokeboxImporterFilter({
    data: pokebox
      .map(({pokemon, ...pokeInBox}): PokeInBoxForFilter | null => {
        const pokemonInfo = pokedexMap[pokemon];

        if (!pokemonInfo) {
          return null;
        }

        return {
          ...pokeInBox,
          name: pokeInBox.name ?? t2(`PokemonName.${pokemon}`),
          search: [t2(`PokemonName.${pokemon}`), pokeInBox.name].filter(isNotNullish),
          pokemon: pokemonInfo,
        };
      })
      .filter(isNotNullish),
    ingredientChainMap,
  });
  const collapsible = useCollapsible();

  if (!pokebox.length) {
    return (
      <FeatureLinkImage
        href="/team/box"
        imageSrc="/images/generic/bag.png"
        text={t('Box.Title')}
      />
    );
  }

  return (
    <Flex className="gap-1.5">
      <Collapsible state={collapsible} classNameForHeight="h-72 md:h-56" button={
        <Flex direction="row" center className="gap-0.5">
          <FunnelIcon className="h-6 w-6"/>
        </Flex>
      }>
        <Flex noFullWidth className="gap-1 pr-1">
          <InputRowWithTitle title={t4('Info.Name')}>
            <InputBox
              type="text"
              value={filter.name}
              onChange={({target}) => setFilter((original) => ({
                ...original,
                name: target.value,
              }))}
            />
          </InputRowWithTitle>
          <PokemonFilter
            pokemonList={Object.values(pokedexMap).filter(isNotNullish)}
            filter={filter}
            setFilter={(getUpdated) => setFilter((original) => getUpdated(original))}
            ingredientChainMap={ingredientChainMap}
          />
        </Flex>
      </Collapsible>
      <Flex className="h-[70vh] gap-1 overflow-auto">
        <AutoSizer>
          {({height, width}) => {
            const filteredPokebox = pokebox.filter(({uuid}) => isIncluded[uuid]);

            const smallScreen = width < 594 ? true : false;

            const gridColumnCount = smallScreen ? 1 : 2;
            const gridColumnWidth = smallScreen ? width : width / 2 - 10;
            const gridRowCount = Math.ceil(filteredPokebox.length / gridColumnCount);

            const buttonColumnWidth = smallScreen ? '99%' : '49.45%';

            return (
              <FixedSizeGrid
                height={height}
                columnCount={gridColumnCount}
                columnWidth={gridColumnWidth}
                rowCount={gridRowCount}
                rowHeight={63}
                itemData={filteredPokebox}
                width={width}
                overscanRowCount={5}
              >
                {({style, data, rowIndex, columnIndex}) => {
                  const index = smallScreen ? rowIndex : rowIndex * 2 + columnIndex;

                  if (!data[index]) {
                    return null;
                  }

                  const pokeInBox = data[index];
                  const {name, isShiny, isFavorite} = data[index];

                  const {height, width, ...styleToUse} = style;

                  return (
                    <button
                      key={pokeInBox.uuid}
                      className="button-clickable-bg center group p-1"
                      onClick={() => onPokeboxPicked({...pokeInBox})}
                      style={{...styleToUse, 'width': buttonColumnWidth, 'height': 57}}
                    >
                      <Flex direction="row" center className="items-center gap-1.5">
                        <IconWithInfo
                          imageSrc={`/images/pokemon/icons/${pokeInBox.pokemon}.png`}
                          imageAlt={t2(`PokemonName.${pokeInBox.pokemon}`)}
                          imageDimension="h-12 w-12"
                          imageSizes={imageIconSizes}
                          info={pokeInBox.level}
                          className="shrink-0"
                        />
                        <Flex>
                          <Flex direction="row" center className={clsx('gap-1', isFavorite && pokeInBoxFavoriteStyle)}>
                            {
                              isShiny &&
                              <InfoIcon>
                                <div className="relative h-4 w-4">
                                  <NextImage
                                    src="/images/generic/flash.png" alt={t3('Shiny')}
                                    sizes={imageSmallIconSizes} className="invert-on-light"
                                  />
                                </div>
                              </InfoIcon>
                            }
                            {isFavorite && <BookmarkIcon className="h-5 w-5"/>}
                            <div className="truncate">
                              {name}
                            </div>
                          </Flex>
                          <Flex className="items-end md:flex-row">
                            <PokemonNatureIndicator nature={pokeInBox.nature} hideName/>
                            <div className="ml-auto">
                              <PokemonSubSkillIndicator
                                subSkill={pokeInBox.subSkill}
                                subSkillMap={subSkillMap}
                                level={pokeInBox.level}
                              />
                            </div>
                          </Flex>
                        </Flex>
                      </Flex>
                    </button>
                  );
                }}
              </FixedSizeGrid>
            );
          }}
        </AutoSizer>
      </Flex>
    </Flex>
  );
};

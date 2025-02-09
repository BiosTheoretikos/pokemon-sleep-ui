import React from 'react';

import LinkIcon from '@heroicons/react/24/outline/LinkIcon';
import {clsx} from 'clsx';
import {useSession} from 'next-auth/react';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex/common';
import {FlexLink} from '@/components/layout/flex/link';
import {NextImage} from '@/components/shared/common/image/main';
import {PokemonLevelSlider} from '@/components/shared/pokemon/level/slider';
import {specialtyIdMap} from '@/const/game/pokemon';
import {useTranslatedUserSettings} from '@/hooks/userData/translated';
import {imageIconSizes} from '@/styles/image';
import {PokemonMetaSection} from '@/ui/pokedex/page/meta/section';
import {PokemonBerryProduction} from '@/ui/pokedex/page/production/berry';
import {PokemonProductionCombination} from '@/ui/pokedex/page/production/combination';
import {PokemonIngredientPossibilities} from '@/ui/pokedex/page/production/ingredient/possibility';
import {metaTitleClass} from '@/ui/pokedex/page/style';
import {PokemonDataProps} from '@/ui/pokedex/page/type';


export const PokemonProduction = (props: PokemonDataProps) => {
  const {
    pokemon,
    berryData,
    ingredientChainMap,
    mealMap,
    preloaded,
  } = props;
  const {specialty, berry, ingredientChain} = pokemon;

  const [level, setLevel] = React.useState(1);
  const {data} = useSession();
  const {translatedSettings} = useTranslatedUserSettings({
    bundle: {
      server: preloaded,
      client: data?.user.preloaded,
    },
    mealMap,
  });

  const t = useTranslations('Game');
  const t2 = useTranslations('UI.InPage.Pokedex');
  const t3 = useTranslations('UI.Metadata');

  const chain = ingredientChainMap[ingredientChain];
  const analysisTitle = t3('Analysis.Title', {name: t(`PokemonName.${pokemon.id}`)});

  return (
    <Flex center className="info-section">
      <PokemonLevelSlider value={level} setValue={setLevel} max={berryData.energy.length} noSameLine/>
      <PokemonMetaSection
        title={t2('Info.Berry')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.berry && 'bg-blink')}
      >
        <PokemonBerryProduction
          pokemon={pokemon}
          berryName={t(`Berry.${berry.id}`)}
        />
      </PokemonMetaSection>
      <PokemonMetaSection
        title={t2('Info.Ingredient')}
        titleClassName={clsx(metaTitleClass, specialty === specialtyIdMap.ingredient && 'bg-blink')}
      >
        <PokemonIngredientPossibilities chain={chain}/>
      </PokemonMetaSection>
      <PokemonMetaSection title={t2('Info.Production')} titleClassName={metaTitleClass}>
        <PokemonProductionCombination
          level={level}
          chain={chain}
          translatedSettings={translatedSettings}
          {...props}
        />
      </PokemonMetaSection>
      <PokemonMetaSection title={<LinkIcon className="h-6 w-6"/>} titleClassName={metaTitleClass}>
        <FlexLink href={`/analysis/${pokemon.id}`} className={clsx(
          'button-clickable-bg group items-center gap-1.5 self-end px-2 py-1',
        )}>
          <div>
            {analysisTitle}
          </div>
          <div className="relative h-10 w-10">
            <NextImage
              src="/images/generic/analysis.png"
              alt={analysisTitle}
              sizes={imageIconSizes} className="invert-hoverable"
            />
          </div>
        </FlexLink>
      </PokemonMetaSection>
    </Flex>
  );
};

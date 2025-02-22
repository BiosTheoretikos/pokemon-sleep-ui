import React from 'react';

import {useTranslations} from 'next-intl';

import {CollapsibleFull} from '@/components/layout/collapsible/full';
import {useCollapsible} from '@/components/layout/collapsible/hook';
import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {ColoredEnergyIcon} from '@/components/shared/icon/energyColored';
import {PokemonGroupedProduction} from '@/components/shared/pokemon/production/grouped/main';
import {PokemonProductionSplit} from '@/components/shared/pokemon/production/split/main';
import {TeamMakerResultButton} from '@/ui/team/maker/result/button/main';
import {TeamMakerIngredientStatsUI} from '@/ui/team/maker/result/ingredient';
import {TeamMakerSnorlaxRankFinalEstimate} from '@/ui/team/maker/result/snorlaxRank';
import {TeamMakerResultUiProps} from '@/ui/team/maker/result/type';
import {TeamMakerResultUnit} from '@/ui/team/maker/result/unit';
import {TeamMakerDataProps, TeamMakerResult} from '@/ui/team/maker/type';
import {formatFloat} from '@/utils/number/format';


type Props = TeamMakerDataProps & TeamMakerResultUiProps & {
  result: TeamMakerResult,
};

export const TeamMakerResultComp = ({result, ...props}: Props) => {
  const {
    rates,
    strength,
    ingredientStats,
    finalEstimates,
  } = result;

  const collapsible = useCollapsible();
  const t = useTranslations('UI.Producing');

  return (
    <CollapsibleFull state={collapsible} button={<TeamMakerResultButton result={result}/>}>
      <Flex center className="gap-1.5 p-1">
        <Grid className="grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-5">
          {rates.rates.map((rate) => (
            <TeamMakerResultUnit
              key={rate.payload.uuid}
              rate={rate}
              compStrength={strength.total}
              {...props}
            />
          ))}
        </Grid>
        <PokemonGroupedProduction grouped={rates.grouped}/>
        <TeamMakerIngredientStatsUI ingredientStats={ingredientStats}/>
        <Flex className="items-center gap-1.5 md:flex-row">
          <PokemonProductionSplit specialty={null} {...strength.byType}/>
          <Flex noFullWidth direction="row" className="items-center gap-1 self-end text-2xl">
            <ColoredEnergyIcon dimension="h-8 w-8" alt={t('Total')}/>
            <span>{formatFloat(strength.total)}</span>
          </Flex>
        </Flex>
        <TeamMakerSnorlaxRankFinalEstimate finalEstimates={finalEstimates}/>
      </Flex>
    </CollapsibleFull>
  );
};

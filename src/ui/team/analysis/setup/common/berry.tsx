import React from 'react';

import {PokemonBerryIcon} from '@/components/shared/pokemon/berry/icon';
import {ProducingRateUI} from '@/components/shared/production/rate/main';
import {BerryId} from '@/types/game/berry';
import {ProducingRate} from '@/types/game/producing/rate';
import {TeamAnalysisRateLayoutCommonProps} from '@/ui/team/analysis/setup/common/type';
import {applyPeriodMultiplier} from '@/utils/game/producing/apply';


type Props = TeamAnalysisRateLayoutCommonProps & {
  id: BerryId,
  rate: ProducingRate,
};

export const TeamAnalysisBerryRate = ({id, rate, period}: Props) => {
  return (
    <ProducingRateUI
      rate={applyPeriodMultiplier({rate, period})}
      getIcon={(dimension) => <PokemonBerryIcon id={id} dimension={dimension}/>}
    />
  );
};

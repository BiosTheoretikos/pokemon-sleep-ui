import React from 'react';

import {AdsUnit} from '@/components/ads/main';
import {useTeamAnalysisPokemonFilter} from '@/ui/team/analysis/hook';
import {TeamAnalysisPokemonFilter} from '@/ui/team/analysis/input/main';
import {TeamAnalysisSnorlaxFavorite} from '@/ui/team/analysis/input/snorlaxFavorite';
import {TeamAnalysisSetupView} from '@/ui/team/analysis/setup/main';
import {TeamAnalysisDataProps, TeamAnalysisTeamSetup} from '@/ui/team/analysis/type';
import {migrate} from '@/utils/migrate/main';
import {teamAnalysisSetupMigrators} from '@/utils/migrate/teamAnalysisSetup/migrators';
import {isNotNullish} from '@/utils/type';


export const TeamAnalysisLoadedClient = (props: TeamAnalysisDataProps) => {
  const {pokedex, preloadedSetup} = props;
  const pokemon = Object.values(pokedex).filter(isNotNullish);

  const {filter, setFilter, isIncluded} = useTeamAnalysisPokemonFilter({
    data: pokemon,
    snorlaxFavorite: preloadedSetup?.snorlaxFavorite,
  });
  const [setup, setSetup] = React.useState<TeamAnalysisTeamSetup>(migrate({
    original: {
      team: {
        A: null,
        B: null,
        C: null,
        D: null,
        E: null,
      },
      bonus: {
        overall: 125,
        ingredient: 20,
      },
      version: 1,
    },
    override: preloadedSetup ?? {},
    migrators: teamAnalysisSetupMigrators,
  }));

  return (
    <>
      <TeamAnalysisPokemonFilter
        pokemon={pokemon}
        setup={setup}
        setSetup={setSetup}
        isIncluded={isIncluded}
        filter={filter}
        setFilter={setFilter}
      />
      <AdsUnit/>
      <TeamAnalysisSnorlaxFavorite filter={filter} setFilter={setFilter} pokemon={pokemon} {...props}/>
      <TeamAnalysisSetupView setup={setup} setSetup={setSetup} snorlaxFavorite={filter.snorlaxFavorite} {...props}/>
    </>
  );
};

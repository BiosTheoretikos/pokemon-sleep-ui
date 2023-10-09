import React from 'react';

import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import {clsx} from 'clsx';

import {Flex} from '@/components/layout/flex/common';
import {Grid} from '@/components/layout/grid';
import {TeamAnalysisSetup, teamAnalysisSlotName} from '@/types/teamAnalysis';
import {TeamAnalysisEmptySlot} from '@/ui/team/analysis/setup/team/empty';
import {TeamAnalysisFilledSlot} from '@/ui/team/analysis/setup/team/filled';
import {TeamAnalysisFilledProps} from '@/ui/team/analysis/setup/team/type';
import {toTeamAnalysisMember} from '@/ui/team/analysis/setup/team/utils';
import {TeamProducingStats} from '@/ui/team/analysis/setup/type';
import {TeamAnalysisDataProps} from '@/ui/team/analysis/type';
import {getCurrentTeam} from '@/ui/team/analysis/utils';
import {getPokemonProducingParams} from '@/utils/game/producing/pokemon';


type Props = TeamAnalysisDataProps & TeamAnalysisFilledProps & {
  statsOfTeam: TeamProducingStats,
};

export const TeamAnalysisTeamView = (props: Props) => {
  const {
    setup,
    setSetup,
    pokedexMap,
    pokemonProducingParamsMap,
    statsOfTeam,
  } = props;

  const {members, snorlaxFavorite} = getCurrentTeam({setup});

  return (
    <Grid className="grid-cols-1 gap-1.5 lg:grid-cols-3 2xl:grid-cols-5">
      {teamAnalysisSlotName.map((slotName) => {
        const member = members[slotName];
        const pokemon = member ? pokedexMap[member.pokemonId] : undefined;
        const stats = statsOfTeam.bySlot[slotName];

        const isAvailable = member && pokemon && stats;

        return (
          <Flex key={slotName} direction="col" center className={clsx(
            'button-bg relative gap-1.5 rounded-lg p-3',
          )}>
            <button
              className={clsx(
                'absolute right-1 top-1 z-10 h-5 w-5 rounded-full',
                'enabled:button-clickable disabled:button-disabled-border',
              )}
              disabled={!member}
              onClick={() => setSetup((original) => ({
                ...original,
                comps: {
                  ...original.comps,
                  [original.config.current]: getCurrentTeam({
                    setup: original,
                    overrideSlot: slotName,
                    overrideMember: null,
                  }),
                },
              }))}
            >
              <XMarkIcon/>
            </button>
            {isAvailable ?
              <TeamAnalysisFilledSlot
                {...props}
                snorlaxFavorite={snorlaxFavorite}
                slotName={slotName}
                member={member}
                stats={stats}
                pokemon={pokemon}
                pokemonProducingParams={getPokemonProducingParams({
                  pokemonId: pokemon.id,
                  pokemonProducingParamsMap,
                })}
              /> :
              <TeamAnalysisEmptySlot
                {...props}
                onPokeboxPicked={(member) => setSetup((original): TeamAnalysisSetup => ({
                  ...original,
                  comps: {
                    ...original.comps,
                    [original.config.current]: getCurrentTeam({
                      setup: original,
                      overrideSlot: slotName,
                      overrideMember: toTeamAnalysisMember(member),
                    }),
                  },
                }))}
              />}
          </Flex>
        );
      })}
    </Grid>
  );
};

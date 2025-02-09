import React from 'react';

import QuestionMarkCircleIcon from '@heroicons/react/24/outline/QuestionMarkCircleIcon';

import {Flex} from '@/components/layout/flex/common';
import {PokemonSubSkillSelectionButton} from '@/components/shared/pokemon/subSkill/selector/button';
import {SubSkillData, SubSkillId} from '@/types/game/pokemon/subSkill';


type Props = {
  data: SubSkillData[],
  selectedSubSkills: SubSkillId[],
  onSelect: (id: SubSkillId) => void,
};

export const PokemonSubSkillSelectionButtons = ({data, selectedSubSkills, onSelect}: Props) => {
  return (
    <Flex direction="row" center wrap className="gap-2">
      {data.length ?
        data.map((single) => (
          <PokemonSubSkillSelectionButton
            key={single.id}
            data={single}
            selectable={!selectedSubSkills.includes(single.id)}
            onClick={() => onSelect(single.id)}
          />
        )) :
        <QuestionMarkCircleIcon className="h-9 w-9"/>}
    </Flex>
  );
};

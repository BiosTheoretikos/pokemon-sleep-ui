import React from 'react';

import MagnifyingGlassCircleIcon from '@heroicons/react/24/outline/MagnifyingGlassCircleIcon';

import {FilterExpandedInput} from '@/components/input/filter/expanded/main';
import {FilterExpandedInputProps} from '@/components/input/filter/expanded/type';
import {Flex} from '@/components/layout/flex/common';
import {RatingBasisSelectionCommonProps} from '@/components/shared/pokemon/rating/basis/selection/type';
import {textFilterButtonStyle} from '@/styles/input';
import {RatingBasis} from '@/types/game/pokemon/rating';


type Props<TRatingBasis extends RatingBasis | null> =
  Pick<FilterExpandedInputProps<TRatingBasis>, 'ids' | 'idToButton'> &
  RatingBasisSelectionCommonProps<TRatingBasis>;

export const RatingBasisSelectionBase = <TRatingBasis extends RatingBasis | null>({
  current,
  onSelect,
  ...props
}: Props<TRatingBasis>) => {
  return (
    <FilterExpandedInput
      onClick={onSelect}
      isActive={(basis) => basis === current}
      title={
        <Flex center>
          <MagnifyingGlassCircleIcon className="h-6 w-6"/>
        </Flex>
      }
      className={textFilterButtonStyle}
      {...props}
    />
  );
};

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

import {Flex} from '@/components/layout/flex';
import {textShadow} from '@/styles/classes';
import {imageIconSizes} from '@/styles/image';
import {Meal} from '@/types/mongo/meal';
import {classNames} from '@/utils/react';


type Props = {
  meal: Meal,
  useTextShadow?: boolean,
};

export const IngredientIcons = ({meal, useTextShadow = true}: Props) => {
  const t = useTranslations('Game.Food');

  return (
    <>
      {meal.ingredients.map(({id, quantity}) => (
        <Link key={id} href={`/ingredient/${id}`}>
          <Flex direction="row" className="gap-0.5">
            <div className="relative h-4 w-4">
              <Image src={`/images/ingredient/${id}.png`} alt={t(id.toString())} fill sizes={imageIconSizes}/>
            </div>
            <div className={classNames('text-xs', useTextShadow ? textShadow : undefined)}>
              {quantity}
            </div>
          </Flex>
        </Link>
      ))}
    </>
  );
};

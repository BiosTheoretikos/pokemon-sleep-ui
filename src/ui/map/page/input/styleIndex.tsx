import React from 'react';

import Image from 'next/image';
import {useTranslations} from 'next-intl';

import {FilterTextInput} from '@/components/input/filter/text';
import {FilterInputProps} from '@/components/input/filter/type';
import {getMultiSelectOnClickProps} from '@/components/input/filter/utils/props';
import {Flex} from '@/components/layout/flex';
import {imageIconSizes, imageSmallIconSizes} from '@/styles/image';
import {SleepStyleId} from '@/types/mongo/sleepStyle';
import {MapPageFilter} from '@/ui/map/page/type';


type Props = FilterInputProps<MapPageFilter> & {
  sleepStyles: SleepStyleId[],
};

export const MapInputSleepStyleToggle = (props: Props) => {
  const {filter, setFilter, sleepStyles} = props;
  const {sleepStyle} = filter;

  const t = useTranslations('UI.InPage.Map');

  return (
    <FilterTextInput
      title={
        <Flex direction="row" center>
          <div className="relative h-8 w-8">
            <Image
              src="/images/generic/sleep.png" alt={t('SleepStyle')} fill sizes={imageIconSizes}
              className="invert-icon"
            />
          </div>
        </Flex>
      }
      idToItemId={(id) => `SleepStyle-${id}`}
      idToButton={(id) => {
        if (id === 'onSnorlax') {
          return (
            <div className="relative h-4 w-4">
              <Image
                src="/images/generic/flash.png" alt={id} fill sizes={imageSmallIconSizes}
                className={sleepStyle.onSnorlax ? 'invert-on-dark' : 'invert-on-light'}
              />
            </div>
          );
        }

        return `#${id}`;
      }}
      ids={sleepStyles}
      {...getMultiSelectOnClickProps({
        filter,
        setFilter,
        filterKey: 'sleepStyle',
      })}
    />
  );
};

'use client';
import React from 'react';

import {Adsense} from '@ctrl/react-adsense';
import {useTheme} from 'next-themes';

import {adsClientId} from '@/components/ads/const';
import {AdsUnitProps} from '@/components/ads/unit/types';
import {getAdSenseValue} from '@/components/ads/unit/utils';
import {AdsWrapper} from '@/components/ads/wrapper';


type Props = AdsUnitProps;

export const AdsUnitDisplay = ({slot}: Props) => {
  const {theme} = useTheme();

  return (
    <AdsWrapper>
      <Adsense
        client={adsClientId}
        slot={getAdSenseValue({value: slot, theme})}
        className="block"
        format="horizontal"
        responsive="true"
      />
    </AdsWrapper>
  );
};

import React from 'react';

import {clsx} from 'clsx';

import {Link} from '@/components/i18n/exports';
import {Flex} from '@/components/layout/flex/common';
import {FeatureLinkProps} from '@/components/shared/link/type';

import styles from './main.module.css';


type Props = FeatureLinkProps & {
  text: string,
};

export const FeatureLink = ({href, disabled, text, children}: React.PropsWithChildren<Props>) => {
  if (disabled) {
    return (
      <button disabled className={clsx('button-disabled-border', styles['home-link'])}>
        <Flex direction="row" center className="h-full gap-1.5">
          {children}
          <div className="text-lg">
            {text}
          </div>
        </Flex>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={clsx('button-clickable group border border-slate-700 dark:border-slate-300', styles['home-link'])}
    >
      <Flex
        direction="row" center
        className="h-full gap-1.5 transition-transform group-hover:scale-125 motion-reduce:transform-none"
      >
        {children}
        <div className="text-lg">
          {text}
        </div>
      </Flex>
    </Link>
  );
};

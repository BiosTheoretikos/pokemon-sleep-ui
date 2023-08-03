import createMiddleware from 'next-intl/middleware';

import {locales} from '@/const/website';


export default createMiddleware({
  locales: [...locales],
  defaultLocale: 'en',
});

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

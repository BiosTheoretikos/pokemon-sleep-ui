import {useSession} from 'next-auth/react';


export const useOverridableSession = (override?: ReturnType<typeof useSession>) => {
  const sessionDefault = useSession();
  return override || sessionDefault;
};

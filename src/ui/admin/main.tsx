import React from 'react';

import {getAllActivations} from '@/controller/user/account/activation';
import {getUserIdEmailMap} from '@/controller/user/auth/main';
import {DefaultPageProps} from '@/types/next/page';
import {SiteAdminClient} from '@/ui/admin/client';
import {SiteAdminDataProps} from '@/ui/admin/type';
import {AdminOnlyPageLayout} from '@/ui/base/layout/adminOnly';
import {toUserActivationDataAtClient} from '@/utils/user/activation';


const SiteAdmin = async () => {
  const activations = await getAllActivations();
  const userIdEmailMap = await getUserIdEmailMap(activations.map(({userId}) => userId));

  const props: SiteAdminDataProps = {
    activations: activations.map(toUserActivationDataAtClient),
    userIdEmailMap,
  };

  return <SiteAdminClient {...props}/>;
};


export const SiteAdminEntry = async ({params}: DefaultPageProps) => {
  const {locale} = params;

  return (
    <AdminOnlyPageLayout locale={locale}>
      <SiteAdmin/>
    </AdminOnlyPageLayout>
  );
};

import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';
import { SidebarUserButtonClient } from './_SidebarUserButtonClient';

export const SidebarUserButton = () => {
  return (
    <Suspense>
      <SidebarUserSuspense />
    </Suspense>
  );
};

const SidebarUserSuspense = async () => {
  const { userId } = await auth();

  return (
    <SidebarUserButtonClient
      user={{ email: 'matinbahaedini@gmail.com', name: 'matin', imageUrl: '' }}
    />
  );
};

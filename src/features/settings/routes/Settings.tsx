import React from 'react';
import ViewBody from '../../../components/ViewBody';
import { TopBar } from '../../../components/TopBar';
import { SettingsTable } from '../components';
import { InviteUser } from '../components/InviteUser';

export const Settings = () => (
  <>
    <TopBar>
      <InviteUser />
    </TopBar>
    <ViewBody>
      <SettingsTable />
    </ViewBody>
  </>
);

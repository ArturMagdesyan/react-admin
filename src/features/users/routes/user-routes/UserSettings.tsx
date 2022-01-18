import React from 'react';
import ViewBody from '../../../../components/ViewBody';
import { UserProfileNavLinks } from '../../components/UserProfileNavLinks';
import { ViewBodySection } from '../../../../components/ViewBodySection';
import { UserProfileSettings } from '../../components/UserProfileSettings';

export const UserSettings = () => (
  <ViewBody>
    <ViewBodySection>
      <UserProfileNavLinks />
    </ViewBodySection>
    <UserProfileSettings />
  </ViewBody>
);

import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopBar } from '../../../../components/TopBar';
import { UsersContext } from '../../contexts';
import { SelectTechniques } from '../../../../components/SelectTechniques';
import { Technique } from '../../../../common/enums';

const withoutTechniquesPaths = ['/users/customers'];
const notMultipleTechniquesPaths = ['/users/technique'];

export const Users = () => {
  const { dispatch } = useContext(UsersContext);
  const location = useLocation();
  const isMultiple = !notMultipleTechniquesPaths.includes(location.pathname);

  return (
    <>
      <TopBar>
        <SelectTechniques
          dispatch={dispatch}
          disabled={withoutTechniquesPaths.indexOf(location.pathname) > -1}
          multiple={isMultiple}
          defaultValue={isMultiple ? undefined : Technique.MANIPULATOR}
        />
      </TopBar>
      <Outlet />
    </>
  );
};

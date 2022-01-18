import React from 'react';
import {
  AutoTowerIcon,
  ManipulatorIcon,
  ConcretePumpIcon,
  CraneIcon,
  LongVehicleIcon,
} from '../Icons';
import { Technique as TechniqueEnum } from '../../common/enums';
import { MaterialColors } from '../TableStatus';

interface Props {
  techniqueName: TechniqueEnum;
  fontSize?: 'inherit' | 'large' | 'medium' | 'small';
  color?: MaterialColors;
}

export const Technique = ({
  techniqueName,
  fontSize,
  color,
}: Props) => {
  switch (techniqueName) {
    case TechniqueEnum.AUTO_TOWER:
      return <AutoTowerIcon viewBox="0 0 39 23" fontSize={fontSize} color={color} />;
    case TechniqueEnum.CONCRETE_PUMP:
      return <ConcretePumpIcon viewBox="0 0 55 29" fontSize={fontSize} color={color} />;
    case TechniqueEnum.CRANE:
      return <CraneIcon viewBox="0 0 55 25" fontSize={fontSize} color={color} />;
    case TechniqueEnum.LONG_VEHICLE:
      return <LongVehicleIcon viewBox="0 0 38 17" fontSize={fontSize} color={color} />;
    case TechniqueEnum.MANIPULATOR:
      return <ManipulatorIcon viewBox="0 0 38 20" fontSize={fontSize} color={color} />;
    default:
      return null;
  }
};

Technique.defaultProps = {
  fontSize: 'large',
  color: 'info',
};

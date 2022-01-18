import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { INFO, PRIMARY } from '../../common/constants/global-styles-variables.constant';

const StyledLink = styled(RouterLink)`
  color: ${INFO};
  text-decoration: none;
  :hover {
    text-decoration: underline;
    color: ${PRIMARY};
  }
`;

const InternalLink = React.forwardRef<any, RouterLinkProps>((
  props,
  ref,
) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StyledLink ref={ref} {...props} role={undefined} />
));

export default InternalLink;

import React from 'react';
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import logo from './logo.svg';

const spin = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const Logo = props => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 2s linear`;

  return <Image animation={animation} src={logo} {...props} />;
};

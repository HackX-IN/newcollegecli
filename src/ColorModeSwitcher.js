import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { GiMoon } from 'react-icons/gi';
import { BiSun } from 'react-icons/bi';


export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(GiMoon, BiSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      zIndex={'overlay'}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      color="current"
      position={"fixed"}
      top={'4px'}
      right={'4'}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

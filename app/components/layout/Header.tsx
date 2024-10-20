'use client'; 

import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

interface HeaderProps {
  isAuthenticated: boolean; 
  onLogout: () => void;
}

export default function Header({ isAuthenticated, onLogout }: HeaderProps) {
  return (
    <Box bg="background" px={4} py={4} borderBottom="1px solid" borderColor="primary">
      <Flex justify="space-between" align="center">
        <Image src="/burnHead.svg" alt="Nakamoto" boxSize="100px" />
        {isAuthenticated && ( 
          <Button
          onClick={onLogout}
          colorScheme="red"
          variant="outline"
          leftIcon={<FaSignOutAlt />}
          size="md"
      >
          Logout
      </Button>
        )}
      </Flex>
    </Box>
  );
}

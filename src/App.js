import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import ProjectApp from './ProjectApp';
import { theme } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box mx={10} mt={5}>
        <ProjectApp />
      </Box>
    </ChakraProvider>
  );
}

export default App;

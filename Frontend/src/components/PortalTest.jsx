import { useState } from 'react';
import { Portal, Box, Button, Text } from '@chakra-ui/react';

const PortalTest = () => {
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div className="p-6 border-2 border-red-500 bg-yellow-100">
      <h2 className="text-xl font-bold mb-4">Portal Test Area</h2>
      <p className="mb-4">Энэ нь normal div юм (yellow background)</p>
      
      <Button 
        colorScheme="blue" 
        onClick={() => setShowPortal(!showPortal)}
        className="mb-4"
      >
        {showPortal ? 'Portal-г хаах' : 'Portal-г нээх'}
      </Button>

      <div className="text-sm text-gray-600 mb-4">
        Portal {showPortal ? 'НЭЭГДСЭН' : 'ХААГДСАН'} байна
      </div>

      {/* Энгийн div (Portal биш) */}
      {showPortal && (
        <div className="p-4 bg-green-300 border border-green-600 mb-4">
          <Text>✅ Энэ нь энгийн div (Portal биш)</Text>
          <Text>→ Энэ нь parent container доторх байрлана</Text>
        </div>
      )}

      {/* Portal ашиглан */}
      {showPortal && (
        <Portal>
          <Box
            position="fixed"
            top="20px"
            right="20px"
            bg="red.500"
            color="white"
            p={4}
            borderRadius="md"
            boxShadow="xl"
            zIndex={9999}
            maxWidth="300px"
          >
            <Text fontWeight="bold" mb={2}>🚀 CHAKRA PORTAL!</Text>
            <Text fontSize="sm" mb={3}>
              Энэ нь DOM tree-ээс гарч, screen-ийн хамгийн дээд давхаргад байрлана!
            </Text>
            <Text fontSize="xs" opacity={0.8}>
              Fixed position, z-index: 9999
            </Text>
            <Button
              size="sm"
              mt={2}
              colorScheme="blackAlpha"
              onClick={() => setShowPortal(false)}
            >
              Хаах
            </Button>
          </Box>
        </Portal>
      )}
    </div>
  );
};

export default PortalTest;

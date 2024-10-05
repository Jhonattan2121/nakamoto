'use client'
import { Box, Button, Container, Flex, Grid, GridItem, Image, keyframes, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { dummyProducts } from './components/store/Products';

// Animação de rotação
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Estilos para o cartão flip
const flipCardInnerStyles = {
  position: "relative",
  width: "100%",
  height: "100%",
  textAlign: "center",
  transition: "transform 0.6s",
  transformStyle: "preserve-3d",
};

const flipCardFlippedStyles = {
  transform: "rotateY(180deg)",
};

const flipCardSideStyles = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
};

const flipCardBackStyles = {
  transform: "rotateY(180deg)",
};

export default function Home() {
  const [isFlipped, setIsFlipped] = useState<boolean[]>(Array(dummyProducts.length).fill(false)); 

  const handleClick = (index: number) => {
    const updatedFlips = [...isFlipped];
    updatedFlips[index] = !updatedFlips[index];
    setIsFlipped(updatedFlips);
  };

  return (
    <Box bg="#0a0e0b" color="white" minH="100vh">
      {/* Cabeçalho com texto e imagem */}
      <Container maxW="container.xl" py={12}>
        <Flex 
          align="center" 
          justify="center" 
          flexDirection={{ base: 'column', md: 'row' }} 
          textAlign={{ base: 'center', md: 'left' }} 
          mb={8}
        >
          <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="bold" mb={{ base: 4, md: 0 }} flex={1}>
            Home to only the most immutable and unprunable artworks on the Bitcoin blockchain
            <br />
            <br />
            -NSIDirectory
          </Text>
          <Image
            src="/burnHead.svg"
            alt="Nakamoto"
            boxSize={{ base: "160px", md: "240px" }}
            animation={`${spin} 4s linear infinite`}
          />
        </Flex>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6} py={12}>
          <Image src="/nsi1.png" alt="First Image" objectFit="cover"  borderRadius="md" />
        </Grid>

        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" textAlign="center" mb={8}>
          STAMP Artworks
        </Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={6} mb={8}>
          {dummyProducts.map((product, index) => {
            const imageUrl = product.imageUrls[0];
            const width = product.width ?? 0;
            const height = product.height ?? 0;
            const isLandscape = width > height;

            return (
              <GridItem
                key={product.id}
                textAlign="center"
                onClick={() => handleClick(index)}
                colSpan={{ base: 1, md: isLandscape ? 2 : 1 }}
              >
                <Box sx={{ ...flipCardInnerStyles, ...(isFlipped[index] && flipCardFlippedStyles) }}>
                  {!isFlipped[index] ? (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      border="2px solid #fff"
                      borderRadius="md"
                      sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <Box sx={{ ...flipCardSideStyles, ...flipCardBackStyles }}>
                      <Image
                        src="/nsi1.png"
                        alt="Primeira Imagem"
                        sx={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  )}

                  <Text fontSize="sm" color="gray.400">STAMP #{product.id}</Text>
                  <Text fontSize="sm" color="gray.400">Artista: {product.name}</Text>
                </Box>
              </GridItem>
            );
          })}
        </Grid>

        <Flex justify="center">
          <Button
            as="a"
            href="/submit-art"
            variant="outline"
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            mb={12}
          >
            Submit Art
          </Button>
        </Flex>
      </Container>

      <Container maxW="container.xl" py={12}>
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" mb={8} color="lightgreen">
          Whats new in STAMPS...
        </Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={10}>
          <GridItem>
            <Text fontSize="lg" mb={4}>
              <strong>STAMPS Artworks showcasing in Pepe in Bali August 2024</strong>
              <br />
              The Pepe in Bali Exhibition at the Superlative Gallery in Bali showcases Pepe art from August 11th to August 24th, 2024. 
              The event features diverse Pepe interpretations in Bali, focusing on digital art and technology, with involvement from curators, collaborators, and the Pepe community.
            </Text>
            <Image src="/nft.jpeg" alt="Pepe in Bali Exhibition" mb={4} borderRadius="md" />
            <Image src="/nft2.jpeg" alt="Pepe in Bali Exhibition" mb={4} borderRadius="md" />
            <Image src="/nft3.jpeg" alt="Pepe in Bali Exhibition" borderRadius="md" />
          </GridItem>

          <GridItem>
            <Image src="/Pepe in Bali.png" alt="Beeple PepeFest" mb={4} borderRadius="md" />
            <Text fontSize="lg">
              <strong>STAMPS invading Beeple PepeFest August 2024</strong>
              <br />
              PepeFest at Beeple Studios was a community-led celebration of all things Pepe.
            </Text>
          </GridItem>
        </Grid>
      </Container>

      <Container maxW="container.xl" py={8}>
        <Flex justify="center" align="center">
          <Image src="/Stamp Logo.png" alt="Stamp Icon" boxSize="50px" />
        </Flex>
      </Container>
    </Box>
  );
}

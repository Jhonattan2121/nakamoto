'use client';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Flex, Grid, GridItem, Image, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import FlipCard from './components/FlipCard';
import SubmitFormModal from './components/modal/SubmissionModal';
import { dummyProducts } from './components/store/Products';

export default function Home() {
  const [isFlipped, setIsFlipped] = useState<boolean[]>(Array(dummyProducts.length).fill(false));
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCardClick = (index: number) => {
    const updatedFlips = [...isFlipped];
    updatedFlips[index] = !updatedFlips[index];
    setIsFlipped(updatedFlips);
  };

  return (
    <Box bg="#0a0e0b" color="white"
    >
      <Container maxW="container.xl" >
        <Flex
          align="center"
          justify="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }}
          mb={12}
        >
          <Text
            fontSize={{ base: 'lg', md: 'xx-large' }}
            fontWeight="bold"
            mb={{ base: 4, md: 0 }}
            flex={1}

          >
            Home to only the most immutable and unprunable artworks on the Bitcoin blockchain
          </Text>
          <Image
            src="/burnHead.svg"
            alt="Nakamoto"
            boxSize={{ base: "160px", md: "300px" }}
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
            mb={{ base: 4, md: 0 }}
          />

        </Flex>
        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="bold"
          textAlign="center"
          mb={8}
        >
          -NSIDirectory
        </Text>
        <Center mb={8}>
          <Flex
            direction="row"
            align="center"
            justify="center"
            wrap="wrap"
          >
            <FlipCard />

          </Flex>
        </Center>


        <Text fontSize={{ base: 'xl', md: 'xxx-large' }} fontWeight="bold"  mb={8}>
          STAMP Artworks
        </Text>

        <Grid
          templateColumns={{
            base: '1fr',
            sm: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={6}
          mb={8}
          justifyContent="center"
          alignItems="stretch"
        >
          {dummyProducts.map((product, index) => {
            const imageUrl = product.imageUrls ? product.imageUrls[0] : "/nsi1.png";
            const isWideImage = (product.width ?? 0) > (product.height ?? 0);

            return (
              <GridItem
                key={index}
                textAlign="center"
                onClick={() => handleCardClick(index)}
                colSpan={{ base: isWideImage ? 1 : 1, md: isWideImage ? 2 : 1 }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  alignItems="center"
                  height={{ base: "400px", md: "410px" }}
                  position="relative"
                  style={{ perspective: "1000px" }}
                  mb={6}
                >
                  <Card
                    sx={{
                      transition: "transform 1.1s",
                      transform: isFlipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      overflow: "hidden",
                    }}
                    bg="transparent"
                    size="sm"
                  >
                    <CardBody bg={"transparent"}>
                      <Center>
                        <Box mb={2} overflow="hidden">
                          <Image
                            src={imageUrl}
                            alt={`Image ${index}`}
                            objectFit="contain"
                            width="100%"
                            height="auto"
                            maxHeight={isWideImage ? "400px" : "300px"}

                            borderRadius="lg"
                          />
                        </Box>
                      </Center>
                    </CardBody>
                    <Text fontSize={{ base: 'x-large', md: 'md' }} fontWeight="bold">STAMP #{product.stamp}</Text>
                    <Text fontSize={{ base: 'x-large', md: 'md' }} fontWeight="bold">Artist: {product.name}</Text>
                  </Card>

                  {/* Card Verso */}
                  <Card
                    sx={{
                      transition: "transform 1.1s",
                      transform: isFlipped[index] ? "rotateY(0deg)" : "rotateY(180deg)",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      overflow: "hidden",
                    }}
                    bg="transparent"
                    size="sm"
                    color="white"
                  >
                    <CardHeader
                      borderBottom={"1px solid white"}
                      borderTopRadius="10px"
                      textAlign="center"
                      p={2}
                    >
                      <Text size="md" color="white">
                        Additional Info
                      </Text>
                    </CardHeader>
                    <CardBody textAlign="center" width="100%" height="100%" borderRadius="20px">
                      <Text color="gray.400">This is the back of the card.</Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        colorScheme="yellow"
                        size="sm"
                        variant={"outline"}
                        onClick={() => handleCardClick(index)}
                      >
                        Back
                      </Button>
                    </CardFooter>
                  </Card>
                </Box>
              </GridItem>
            );
          })}
        </Grid>

        <Flex justify="center">
          <Box textAlign="center" mb={12}>
            <Text
              onClick={onOpen}
              as="span"
              fontSize="xx-large"
              fontWeight="bold"
            >
              Submit Art
            </Text>
            <Box
              height="5px"
              bg="green"
              width="100%"

            />
          </Box>
        </Flex>


        <SubmitFormModal isOpen={isOpen} onClose={onClose} />
      </Container>

      <Container maxW="container.xl" py={12}>

        <Text
          fontSize={{ base: 'xl', md: 'xxx-large' }}

          mb={8}
        >
          What&apos;s new in STAMPS...
        </Text>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={10}>
          <GridItem>
            <Text fontSize={{ base: 'xl', md: 'large' }} mb={5}>STAMPS Artworks showcasing in Pepe in Bali August 2024</Text>
            <Text fontSize={{ base: 'xl', md: 'large' }}>
  The &quot;Pepe in Bali Exhibition&quot; at the Superlative Gallery in Bali showcases Pepe art from August 11th to August 24th, 2024. It educates on Pepe&apos;s cultural significance, digital art history, and engages with the Pepe and internet culture community. The event features diverse Pepe interpretations in Bali, focusing on digital art and technology, with involvement from curators, collaborators, and the Pepe community. Held in Bali, known for digital art, the exhibition highlights the intersection of art, technology, and meme culture.
</Text>

            <Grid
              display={{ base: "none", md: "grid" }}
              templateAreas={{
                md: `
          "image1 image1"
          "image2 image3"
          `,
              }}
              gridTemplateRows="auto"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={0}
              position="relative"
            >
              <GridItem position="relative" left="120px" top="50px">
                <Image src="/nft.jpeg" alt="Pepe in Bali Exhibition" borderRadius="md" />
              </GridItem>

              <GridItem area="image2" position="relative" left="50px" top="0px">
                <Image src="/nft2.jpeg" alt="Pepe in Bali Exhibition" borderRadius="md" />
              </GridItem>

              <GridItem area="image3" position="relative" left="-50px" top="0px">
                <Image src="/nft3.jpeg" alt="Pepe in Bali Exhibition" borderRadius="md" />
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem>
            <Image src="/Pepe in Bali.png" alt="Beeple PepeFest" mb={6} borderRadius="md" />
            <Text fontSize={{ base: 'xl', md: 'x-large' }}>STAMPS invading Beeple PepeFest August 2024</Text>
            <Text fontSize={{ base: 'xl', md: 'x-large' }}>
              PepeFest at Beeple Studios was a community-led celebration of all things Pepe.
            </Text>
          </GridItem>
        </Grid>
        <Grid
          display={{ base: "grid", md: "none" }}
          gridTemplateColumns="1fr"
          gap={4}
          mt={8}
        >
          <GridItem position="relative"
          >
            <Image src="/11.png" alt="Pepe in Bali Exhibition" borderRadius="md" />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

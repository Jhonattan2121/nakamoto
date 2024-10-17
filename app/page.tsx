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
    <Box bg="#0a0e0b" color="white" >
      <Container maxW="container.xl" >
        <Flex
          align="center"
          justify="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }}

        >
          <Text
            fontSize={{ base: 'lg', md: '2xl' }}
            fontWeight="bold"
            mb={{ base: 4, md: 0 }}
            flex={1}

          >
            Home to only the most immutable and unprunable artworks on the Bitcoin blockchain
          </Text>
          <Image
            src="/burnHead.svg"
            alt="Nakamoto"
            boxSize={{ base: "160px", md: "240px" }}
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
            <Image
              src='/nsi1.png'
              alt=''
              ml={4}
              maxWidth="90%"
              objectFit="contain"
              border="2px solid"
              borderColor="limegreen"
            />
          </Flex>
        </Center>


        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" textAlign="center" mb={8}>
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
                  {/* Card Frente */}
                  <Card
                    sx={{
                      transition: "transform 1.1s",
                      transform: isFlipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      overflow: "hidden",
                      borderRadius: "lg",
                    }}
                    bg="transparent"
                    size="sm"
                    color="white"
                  >
                    <CardBody bg={"transparent"}>
                      <Center>
                        <Box mb={2} overflow="hidden">
                          <Image
                            src={imageUrl}
                            alt={`Image ${index}`}
                            objectFit="cover"
                            width="100%"
                            height="auto"
                            maxHeight={isWideImage ? "400px" : "300px"}
                            borderRadius="lg"
                          />
                        </Box>
                      </Center>
                    </CardBody>
                    <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold">STAMP #{index + 1}</Text>
                    <Text fontSize={{ base: 'sm', md: 'md' }}>{product.name}</Text>
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
                      borderRadius: "lg",
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
          <Button
            onClick={onOpen}
            variant="outline"
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            mb={12}
          >
            Submit Art
          </Button>
        </Flex>

        <SubmitFormModal isOpen={isOpen} onClose={onClose} />
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
            <Grid
              templateAreas={{
                base: `
                  "image1"
                  "image2"
                  "image3"
                `,
                md: `
                  "image1 image1"
                  "image2 image3"
                `,
              }}
              gridTemplateRows="auto"
              gridTemplateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)"
              }}
              gap={4}
              position="relative"
            >
              <GridItem
                area="image1"
                position="relative"
                left={{ base: "0px", md: "120px" }}
                top={{ base: "0px", md: "50px" }}
              >
                <Image src="/nft.jpeg" alt="Pepe in Bali Exhibition" borderRadius="md" />
              </GridItem>

              <GridItem
                area="image2"
                position="relative"
                left={{ base: "0px", md: "50px" }}
              >
                <Image src="/nft2.jpeg" alt="Pepe in Bali Exhibition" borderRadius="md" />
              </GridItem>

              <GridItem
                area="image3"
                position="relative"
                left={{ base: "0px", md: "-50px" }}
              >
                <Image src="/nft3.jpeg" alt="Pepe in Bali Exhibition" borderRadius="md" />
              </GridItem>
            </Grid>
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

    </Box>
  );
}

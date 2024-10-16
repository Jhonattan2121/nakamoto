"use client";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Image,
    List,
    ListIcon,
    ListItem,
    SimpleGrid,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { MdCheckCircle, MdMenu } from "react-icons/md";
import { supabase } from "../lib/supabase";
import { StampIndexData } from "../utils/StampIndexData";

interface StampDetail {
    STAMP_Asset: string;
    Top: number;
    Title: string;
    Rarity_Score: number;
    imageUrls: string[];
    epoch_name: string;
    epoch_index: string;
    Creator_Name: string;
}

interface Epoch {
    epoch_name: string;
    indices: string[];
}

const StampIndex = () => {
    const [selectedIndex, setSelectedIndex] = useState<string>('');
    const [selectedEpoch, setSelectedEpoch] = useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [epochs, setEpochs] = useState<Epoch[]>([]);
    const [stamps, setStamps] = useState<StampDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [ilsData, setIlsData] = useState<Record<string, StampDetail[]>>({});
    const [flippedIndex, setFlippedIndex] = useState<null | number>(null);

    const handleCardClick = (index: number) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };
    const fetchData = async () => {
        const [{ data: stamps, error: stampsError }, { data: epochsData, error: epochsError }] = await Promise.all([
            supabase.from('products').select('*'),
            supabase.from('epochs').select('*'),
        ]);

        if (stampsError) {
            console.error('Error fetching stamps:', stampsError);
            return;
        }

        if (epochsError) {
            console.error('Error fetching epochs:', epochsError);
            return;
        }

        // Formata os dados de stamps
        const formattedStamps: Record<string, StampDetail[]> = {};
        stamps.forEach(stamp => {
            const key = stamp.epoch_name;
            if (!formattedStamps[key]) {
                formattedStamps[key] = [];
            }
            const stampDetail: StampDetail = {
                STAMP_Asset: stamp.STAMP_Asset,
                Creator_Name: stamp.Creator_Name,
                Top: stamp.Top,
                Title: stamp.Title,
                Rarity_Score: stamp.Rarity_Score || 0,
                imageUrls: stamp.imageUrls,
                epoch_name: stamp.epoch_name,
                epoch_index: stamp.epoch_index,
            };
            formattedStamps[key].push(stampDetail);
        });

        // Formata os dados dos epochs
        const formattedEpochs = epochsData.map(epoch => ({
            epoch_name: epoch.epoch_name,
            indices: epoch.indices || []
        }));

        // Atualiza o estado com os dados formatados
        setIlsData(formattedStamps);
        setEpochs(formattedEpochs);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        if (epochs.length > 0 && !selectedIndex) {
            const firstEpoch = epochs[0]; 
            const firstIndex = firstEpoch.indices[0];
            setSelectedEpoch(firstEpoch.epoch_name); 
            setSelectedIndex(firstIndex); 

            const allStamps = Object.values(ilsData).flat();
            const filteredStamps = allStamps.filter(stamp => stamp.epoch_index === firstIndex);
            setStamps(filteredStamps);
        }
    }, [epochs, ilsData, selectedIndex]);

    const handleIndexClick = (index: string) => {
        setSelectedIndex(index);
        onClose();

        const allStamps = Object.values(ilsData).flat(); 
        const filteredStamps = allStamps.filter(stamp => stamp.epoch_index === index); 
        setStamps(filteredStamps); 
        console.log(filteredStamps);
    };

    const handleEpochClick = (epoch: string) => {
        setSelectedEpoch(epoch);
        console.log(epoch)
    };

    return (
        <Box p={5} mb={10} borderColor="brown" borderRadius="md" color="white" maxW="1200px" mx="auto">
            <Text fontSize={["xl", "2xl"]} fontWeight="bold" mb={4} textAlign="center">
                Nakamoto STAMP Index Timeline
            </Text>

            <SimpleGrid columns={[2, 3, 4, 5]} spacing={2}>
                {StampIndexData.map((artist, index) => (
                    <VStack
                        key={index}
                        textAlign="center"
                        spacing={4}
                        minHeight="300px"
                        justify="space-between"
                    >
                        <Box
                            borderRadius="full"
                            overflow="hidden"
                            boxSize="85px"
                            border="2px solid white"
                        >
                            <Image
                                src={artist.imageUrl}
                                alt={artist.title}
                                width={85}
                                height={85}
                                objectFit="cover"
                                style={{
                                    imageRendering: "pixelated",
                                }}
                            />
                        </Box>

                        <Text fontWeight="bold" fontSize={["md", "lg"]}>
                            {artist.title}
                        </Text>

                        <Text fontSize={["xs", "sm"]}>
                            {artist.description}
                        </Text>

                        <Text fontSize={["sm", "md"]} color="cyan.400" fontWeight="bold">
                            {artist.name}
                        </Text>
                    </VStack>
                ))}
            </SimpleGrid>

            <Button
                display={["flex", "none"]}
                leftIcon={<MdMenu />}
                colorScheme="teal"
                onClick={onOpen}
                mb={4}
            />
            <Flex mt={12} flexDirection={["column", "row"]}>
                <Box width={["100%", "20%"]} display={["none", "block"]} borderRight="1px solid green" pr={5}>
                    {epochs.length > 0 ? (
                        epochs.map((epoch, epochIndex) => (
                            <Box key={epochIndex} mb={4}>
                                <Text
                                    fontWeight="bold"
                                    color="green.400"
                                    mb={2}
                                    cursor="pointer"
                                    onClick={() => handleEpochClick(epoch.epoch_name)}
                                >
                                    {epoch.epoch_name}
                                </Text>
                                <List spacing={2}>
                                    {epoch.indices.map((index: string) => (
                                        <ListItem
                                            key={index}
                                            cursor="pointer"
                                            onClick={() => handleIndexClick(index)}
                                        >
                                            <ListIcon as={MdCheckCircle} color="green.500" />
                                            {index}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        ))
                    ) : (
                        <Text>Loading epochs...</Text>
                    )}
                </Box>

                <Box width={["100%", "100%"]} pl={[0, 25]} textAlign="center">
                    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                        {stamps.map((stamp: StampDetail, stampIndex) => {
                            const isCardFlipped = flippedIndex === stampIndex;

                            return (
                                <Box
                                    key={stamp.STAMP_Asset}
                                    width="300px"
                                    height="550px"
                                    onClick={() => handleCardClick(stampIndex)}
                                    position="relative"
                                    marginBottom={6}

                                >
                                    {/* Card Frente */}
                                    <Card
                                        sx={{
                                            transition: "transform 1.1s",
                                            transform: isCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                        }}
                                        bg={"black"}
                                        border={"2px solid limegreen"}
                                        size="sm"
                                        color={"white"}
                                        boxShadow="md"
                                    >

                                        <Text fontWeight={"bold"} fontSize={"20px"} color="white">
                                            Stamp {stamp.STAMP_Asset}
                                        </Text>
                                        <CardBody bg={"transparent"}>
                                            <Center>
                                                <Box mb={2} maxW="200px" maxH="200px" overflow="hidden">
                                                <Image
                                                        src={stamp.imageUrls[0] || "https://via.placeholder.com/150"}
                                                        alt={stamp.STAMP_Asset}
                                                        width={200}
                                                        height={200}
                                                        objectFit="cover"
                                                        style={{
                                                            imageRendering: "pixelated",
                                                        }}
                                                    />
                                                </Box>
                                            </Center>

                                            <Box p={8}>
                                                <Text color={"white"} fontSize="large">
                                                    <strong>Creator:</strong> {stamp.Creator_Name}
                                                </Text>
                                                <Text color={"white"} textAlign="center" fontSize="large">
                                                    <strong>Rarity:</strong> {stamp.Title}
                                                </Text>
                                                <Text color={"white"} textAlign="center" fontSize="large">
                                                    <strong>Score:</strong>{stamp.Rarity_Score}
                                                </Text>
                                            </Box>




                                        </CardBody>
                                    </Card>

                                    {/* Card Verso */}
                                    <Card
                                        sx={{
                                            transition: "transform 1.1s",
                                            transform: isCardFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
                                            position: "absolute",
                                            width: "100%",
                                            height: "100%",
                                            backfaceVisibility: "hidden",
                                        }}
                                        bg={"black"}
                                        border={"2px solid limegreen"}
                                        size="sm"
                                        color={"white"}
                                        boxShadow="md"
                                    >
                                        <CardHeader
                                            borderBottom={"1px solid white"}
                                            borderTopRadius="10px"
                                            textAlign="center"
                                            bg="gray.800"
                                            p={2}
                                        >
                                            <Text size="md" color="white">
                                                Additional Info
                                            </Text>
                                        </CardHeader>
                                        <CardBody textAlign="center" width="100%" height="100%" borderRadius="20px">
                                            <Text color="gray.400">This is the back of the card.</Text>
                                            {/* Adicione aqui mais informações que você deseja mostrar no verso do card */}
                                        </CardBody>
                                        <CardFooter>
                                            <Button
                                                colorScheme="yellow"
                                                size="sm"
                                                variant={"outline"}
                                                onClick={() => handleCardClick(stampIndex)}
                                            >
                                                Back
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </Box>
                            );
                        })}
                    </SimpleGrid>

                </Box>
            </Flex>

            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Select an Index</DrawerHeader>
                    <DrawerBody>
                        {epochs.length > 0 ? (
                            epochs.map((epoch, epochIndex) => (
                                <Box key={epochIndex} mb={4}>
                                    <Text fontWeight="bold" color="green.400" mb={2}>
                                        {epoch.epoch_name}
                                    </Text>
                                    <List spacing={2}>
                                        {epoch.indices.map((index: string) => (
                                            <ListItem
                                                key={index}
                                                cursor="pointer"
                                                onClick={() => handleIndexClick(index)}
                                            >
                                                <ListIcon as={MdCheckCircle} color="green.500" />
                                                {index}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            ))
                        ) : (
                            <Text>Loading epochs...</Text>
                        )}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button colorScheme="blue" onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default StampIndex;

import { Box, Link, SimpleGrid, Text } from '@chakra-ui/react';

import Image from 'next/image';

const About = () => {
    const TeamMembers = [
        {
            name: 'HNFTPepe',
            handle: '@HnftPepe',
            platform: 'X',
            description: 'Digital Artist,  Stamps/Fake Rares/Rare Cocos/XCP/Ords',
            imageUrl: '/1.png',
        },
        {
            name: 'Socks',
            handle: '@BTC_Socks',
            platform: 'X',
            description: 'Founder of the Bitcoin Socks Project. Goal to sell the most expensive digital Sock in history.',
            imageUrl: '/4.png',
        },
        {
            name: 'Mortylen',
            handle: '@lentymor',
            platform: 'X',
            description: 'Digital artist. Master Orchestrator of Replication Technology',
            imageUrl: '/3.png',
        },
        {
            name: 'AZ',
            handle: '@az0013100',
            platform: 'Telegram',
            description: 'STAMPS OG, artist, doesn’t use X.',
            imageUrl: '/2.jpg',
        },

    ];

    const Advisors = [
        {
            name: 'Mike',
            handle: '@mikeinspace',
            platform: 'X',
            description: 'Founder of STAMPS Protocol. Like to stamp jpegs on the blockchain.',
            imageUrl: '/Mike.png',
        },
        {
            name: 'Viva',
            handle: '@Viva_La_Vandal',
            platform: 'X',
            description: 'Digital Artist, projects founders, entrepreneur, blockchain Vandal.',
            imageUrl: '/6.jpg',
        },
        {
            name: 'Sasha',
            handle: '@ChudoSasshha',
            platform: 'X',
            description: 'ARTIST BUILDER CURATOR QUEEN OF MEMES',
            imageUrl: '/7.jpg',
        },
        {
            name: 'Bobby',
            handle: '@BobbyZoo_BA',
            platform: 'X',
            description: 'OG Digital Artist, STAMPS Collectors, Emergency contact for enemies',
            imageUrl: '/Bobbyzoo.png',
        },
        {
            name: 'Bobby',
            handle: '@BobbyZoo_BA',
            platform: 'X',
            description: 'OG Digital Artist, STAMPS Collectors, Emergency contact for enemies',
            imageUrl: '/9.jpg',
        },
    ]

    return (
        <Box

            color="white"
            p={6}
            maxWidth="850px"
            mx="auto"
            mt={10}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
        >
            <Text as="h2" size="lg" >
                Background:
            </Text>
            <Text mb={4}>
                The STAMPS protocol, initiated in early 2023 by Miki in Space, allows secure and immutable data storage on the Bitcoin blockchain, specifically within the UTXO of transactions. This universal data can be edited and will result in losing its Bitcoin status. Since its launch, Bitcoin STAMPS has become a hub for artists, resulting in nearly 700K STAMPS, mostly digital artworks, embodying the concept that Art is Everything.
            </Text>
            <Text mb={4}>
                STAMPS is part of the Counterparty family, known for pioneering NFTs since 2014, with notable predecessors like $JOK. As the original Nakamoto Card Series 1, Card 1 is highly valued, recently exceeding $100K. As a key player of success for these collectibles, the ecosystem serves as a marketplace for digital assets, enhancing visibility and community engagement.
            </Text>
            <Text mb={4}>
                The digital art landscape evolves, directories will play an increasingly vital role in shaping the future of art creation and appreciation.
            </Text>

            <Text as={'h2'} p={8} mt={12}>
                NSID:
            </Text>
            <Text mb={4}>
                The Nakamoto STAMP Index Directory (NSID) aims to create an official directory for Bitcoin STAMP artworks. Just as Counterparty has Rare Pepe and Fake Rare Directors, Bitcoin STAMP artwork also required a comparable platform.
            </Text>
            <Text mb={4}>
                This is a community-driven project that consists of founders, scientists, tech devs, and advisors for the curation and maintenance of the upcoming STAMP directory. This directory will allow Bitcoin STAMP artists to submit their artwork to be added to the NSI directory. All approved STAMP artwork will be displayed on the official website and various social media.
            </Text>
            <Text mb={4}>
                Official Name: Nakamoto STAMP Index Directory
            </Text>
            <Box >

                <Link mb={4}
                    href="www.nakamotostamps.online"
                    isExternal
                    color="teal.400"

                    fontWeight="bold">
                    Official Webpage:

                </Link>
            </Box>
            <Text mb={4}>
                Email: {`info@nakamotostamps.online`}
            </Text>
            <Text mb={4}>
                Twitter: {`@NSIDirectory`}
            </Text>

            <Text as="h2" size="lg" p={8} mt={12}>
                The STAMPS Directory
            </Text>
            <Text mb={4}>
                The STAMPS Directory is divided into 10 Epochs. Each Epoch consists of 10 Indices (consisted of 42 STAMPS per Index) plus 1 Burn Index (consisted of 1 Burn Card). In total, each Epoch consists of 420 STAMPS plus 10 Burn Cards with a total of 4,300 STAMPS for the entire NSI directory.
            </Text>

            <Box mt={6} overflow="hidden" maxWidth="300px" >
                <Image
                    src="/nsi.png"
                    alt="STAMPS per Epoch"
                    layout="responsive"
                    objectFit="cover"
                    width={100}
                    height={100}
                />
            </Box>

            <Text fontSize="2xl" p={4} >Team Members</Text>
            <Box
                color="white"
                p={6}
                maxWidth="1000px"
                mx="auto"
                mt={10}
            >

                <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
                    {TeamMembers.map((TeamMembers, index) => (
                        <Box key={index} textAlign="center">
                            <Box
                                borderRadius="full"
                                overflow="hidden"
                                boxSize="125px"
                                mx="auto"
                                mb={4}
                                border="2px solid white"
                            >
                                <Image
                                    src={TeamMembers.imageUrl}
                                    alt={TeamMembers.name}
                                    width={125}
                                    height={125}
                                    objectFit="cover"
                                    layout="intrinsic"
                                />
                            </Box>
                            <Text fontSize="lg" fontWeight="bold">
                                {TeamMembers.name}
                            </Text>
                            <Text>{TeamMembers.handle} on {TeamMembers.platform}</Text>
                            <Text>{TeamMembers.description}</Text>
                        </Box>
                    ))}
                </SimpleGrid>

                <Text fontSize="2xl" p={12} >Advisors</Text>

                <SimpleGrid columns={[1, 2, 3, 4 ,5 ]} spacing={8}>
                    {Advisors.map((Advisors, index) => (
                        <Box key={index} textAlign="center">
                            <Box
                                borderRadius="full"
                                overflow="hidden"
                                boxSize="125px"
                                mx="auto"
                                mb={4}
                                border="2px solid white"
                            >
                                <Image
                                    src={Advisors.imageUrl}
                                    alt={Advisors.name}
                                    width={125}
                                    height={125}
                                    objectFit="cover"
                                    layout="intrinsic"
                                />
                            </Box>
                            <Text fontSize="lg" fontWeight="bold">
                                {Advisors.name}
                            </Text>
                            <Text>{Advisors.handle} on {Advisors.platform}</Text>
                            <Text>{Advisors.description}</Text>
                        </Box>
                    ))}
                </SimpleGrid>

                <Text fontSize="2xl" p={8} >Scientists</Text>
                <Text>Too many to list.</Text>

                <Box p={8} mt={12}>
                    <Link
                        href="https://medium.com/@nakamotostampindex/nakamoto-stamp-index-directory-1489cf3ea39a"
                        isExternal
                        color="teal.400"

                        fontWeight="bold"

                    >
                        Read the Medium Article
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}

export default About;
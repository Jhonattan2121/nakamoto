'use client';

import { Box, Link as ChakraLink, Heading, List, ListItem, Text, useTheme } from '@chakra-ui/react';
import React from 'react';

const Rules: React.FC = () => {
    const theme = useTheme();
    const { colors } = theme;

    return (
        <>
            <Box
                p={5}
                mb={10}
                borderRadius="md"
                color="white"
                maxW="600px"
                mx="auto"
            >
                <Heading as="h3" size="lg" mb={4}>
                    Submission Requirements
                </Heading>
                <List spacing={4}>
                    <ListItem>
                        <Text>
                            1. STAMP size does not matter. If you can STAMP it according to STAMP protocol rules, your STAMP qualifies
                            (timing via StampingHub assures your STAMP is valid).
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            2. A minimum of 21+ copies/insurance for any newly STAMPed after the official launch of the STAMPs directory.
                        </Text>
                        <Text>
                            • Note: The amount of STAMPs artwork already minted may not require these rules and may not necessarily result in rejection.
                            Founders and Scientists reserve the right to make exceptions on a case-by-case basis.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>3. All stamps submitted must be locked and not divisible.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>4. No NSFW or highly racial artworks. Use good taste and judgment.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>Do not STAMP other people&#39;s artwork and claim it as your own.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>6. No artwork from generative or PP collection types, IE: StampPunks, Stamps, Src21 Anime, etc.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            7. If any artwork is found to violate the submission guideline (IE: stamping other artist&#39;s artwork, etc.),
                            it will result in immediate disqualification and potentially barring from future submissions.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>8. Each artist is limited to 3 Submissions per Index.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>9. Once an artwork is approved, a burn card is needed before the artwork gets officially added to the directory.</Text>
                    </ListItem>
                </List>
            </Box>

            <Box
                p={5}
                mb={12}
                color="white"
                maxW="600px"
                mx="auto"
            >
                <Heading as="h3" size="lg" mb={4}>
                    Procedure
                </Heading>
                <List spacing={4}>
                    <ListItem>
                        <Text>
                            1. Go to the official STAMPS Directory at{' '}
                            <ChakraLink href="http://www.nakamotostampindex.com" color="cyan.400" isExternal>
                                www.nakamotostampindex.com
                            </ChakraLink>.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>2. Click on &quot;STAMP Submission&quot;.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>3. Read through all the directions and guidelines before submitting.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            4. Ensure that the STAMP artwork you are submitting is in line with the requirements. Refer to the Submission Requirements.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>
                            5. Fill out the submission form provided on the website. Ensure to include the Artist Name, STAMPS Asset Numbers, Title,
                            Description (if any), Email address (for follow-up), and Social Media Link for contact purposes.
                        </Text>
                    </ListItem>
                    <ListItem>
                        <Text>6. Once submitted, allow several days for evaluation. The result will be sent to the provided email or contact information.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>7. If a submitted artwork gets approved, 1 Burn Card will need to be burned for the artwork to be officially added.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>8. A burn transaction confirmation will be required as proof.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>9. Public Open dispensers will be available to acquire the Burn Card if needed.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>10. If a submitted artwork does not get approved, the artist can resubmit in another Index if desired.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>11. For each index, each artist is limited to 3 submissions.</Text>
                    </ListItem>
                    <ListItem>
                        <Text>12. Exceptions can be made depending on the amount of submissions occurring.</Text>
                    </ListItem>
                </List>
            </Box>
            
        </>
    );
};

export default Rules;

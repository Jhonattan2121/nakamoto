'use client';
import { Box, Button, Flex, Image, Link, useColorMode, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import SubmissionModal from '../modal/SubmissionModal';
export default function Header() {
    const { colorMode } = useColorMode();
    const [modalDisplayed, setModalDisplayed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <Box bg="background" px={4} py={4} borderBottom="1px solid" borderColor="primary">
            <Flex justify="space-between" align="center" wrap="wrap">
                <Image src="/burnHead.svg" alt="Nakamoto" boxSize="60px" />
                {/* <HStack as={NextLink} href='/' spacing={2} cursor="pointer">
                    <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
                        Nakamoto
                    </Text>
                </HStack>

                {isMobile ? (
                    <IconButton
                        icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Toggle Navigation"
                        variant="outline"
                        onClick={handleMenuToggle}
                        color="primary"
                    />
                ) : (
                    <HStack spacing={6}>
                        <Link as={NextLink} href='/about' fontSize="lg" fontWeight="bold" color="primary">
                            About Us
                        </Link>
                        <Link as={NextLink} href='/stampIndex' fontSize="lg" fontWeight="bold" color="primary">
                            Stamps Index
                        </Link>
                        <Link as={NextLink} href='/rules' fontSize="lg" fontWeight="bold" color="primary">
                            Rules
                        </Link>
                    </HStack>
                )} */}

                <Button
                    onClick={() => setModalDisplayed(true)}
                    variant="solid"
                    colorScheme="teal"
                    size="md"
                    ml={{ base: 0, md: 4 }}
                    _hover={{ bg: 'teal.600' }}
                >
                    Submit
                </Button>
            </Flex>

            {isMenuOpen && isMobile && (
                <VStack
                    spacing={4}
                    mt={4}
                    align="flex-start"
                    bg="gray.800"
                    borderRadius="md"
                    py={4}
                    px={6}
                    shadow="md"
                    display={isMobile ? 'flex' : 'none'}
                >
                    <Link as={NextLink} href='/about' fontSize="lg" fontWeight="bold" color="primary" onClick={handleMenuToggle}>
                        About Us
                    </Link>
                    <Link as={NextLink} href='/stampIndex' fontSize="lg" fontWeight="bold" color="primary" onClick={handleMenuToggle}>
                        Stamps Index
                    </Link>
                    <Link as={NextLink} href='/rules' fontSize="lg" fontWeight="bold" color="primary" onClick={handleMenuToggle}>
                        Rules
                    </Link>
                </VStack>
            )}

            <SubmissionModal isOpen={modalDisplayed} onClose={() => setModalDisplayed(false)} />
        </Box>
    );
}

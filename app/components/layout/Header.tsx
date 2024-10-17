'use client';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, IconButton, Image, Link, Text, useColorMode, VStack } from '@chakra-ui/react';
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

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <Box bg="background" px={4}  borderBottom="1px solid" borderColor="primary" >
            <Flex justify="space-between" align="center" wrap="wrap">
                <HStack as={NextLink} href='/' spacing={2} cursor="pointer">
                    <Image src="/burnHead.svg" alt="Nakamoto" boxSize={{ base: '80px', md: '100px' }} />
                    <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="primary">
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
                        _hover={{ bg: "gray.200" }} 
                    />
                ) : (
                    <HStack spacing={8}>
                        <Link 
                            as={NextLink} 
                            href='/about' 
                            fontSize="lg" 
                            fontWeight="bold" 
                            color="primary" 
                            textDecoration="none" 
                            _hover={{ textDecoration: 'none', color: 'primary' }} 
                        >
                            About Us
                        </Link>
                        <Link 
                            as={NextLink} 
                            href='/stampIndex' 
                            fontSize="lg" 
                            fontWeight="bold" 
                            color="primary" 
                            textDecoration="none" 
                            _hover={{ textDecoration: 'none', color: 'primary' }} 
                        >
                            Stamps Index
                        </Link>
                        <Link 
                            as={NextLink} 
                            href='/rules' 
                            fontSize="lg" 
                            fontWeight="bold" 
                            color="primary" 
                            textDecoration="none" 
                            _hover={{ textDecoration: 'none', color: 'primary' }} 
                        >
                            Rules
                        </Link>
                    </HStack>
                )}

                <Button
                    onClick={() => setModalDisplayed(true)}
                    variant="solid"
                    colorScheme="teal"
                    size="md"
                    ml={{ base: 0, md: 4 }}
                    _hover={{ bg: 'teal.600' }}
                    display={{ base: "none", md: "inline-flex" }}
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
                >
                    <Link 
                        as={NextLink} 
                        href='/about' 
                        fontSize="lg" 
                        fontWeight="bold" 
                        color="primary" 
                        textDecoration="none" 
                        onClick={handleLinkClick} 
                        _hover={{ textDecoration: 'none', color: 'primary' }} 
                    >
                        About Us
                    </Link>
                    <Link 
                        as={NextLink} 
                        href='/stampIndex' 
                        fontSize="lg" 
                        fontWeight="bold" 
                        color="primary" 
                        textDecoration="none"
                        onClick={handleLinkClick} 
                        _hover={{ textDecoration: 'none', color: 'primary' }} 
                    >
                        Stamps Index
                    </Link>
                    <Link 
                        as={NextLink} 
                        href='/rules' 
                        fontSize="lg" 
                        fontWeight="bold" 
                        color="primary" 
                        textDecoration="none" 
                        onClick={handleLinkClick} 
                        _hover={{ textDecoration: 'none', color: 'primary' }}
                    >
                        Rules
                    </Link>
                </VStack>
            )}

            <SubmissionModal isOpen={modalDisplayed} onClose={() => setModalDisplayed(false)} />
        </Box>
    );
}

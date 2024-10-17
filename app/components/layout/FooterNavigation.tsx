"use client"
import { Box, Button, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import SubmissionModal from '../modal/SubmissionModal';

export default function FooterNavigation() {
    const [modalDisplayed, setModalDisplayed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

  

   
    return (
        <Box
            as="nav"
            position="fixed"
            bottom="0"
            left="0"
            right="0"
            bg="secondary"
            p={2}
            borderTop="1px solid"
            borderColor="border"
            display={{ base: 'block', md: 'none' }}
            zIndex={1}
        >
            <HStack justify="space-around">
                <Button variant="ghost">
                    <Link as={NextLink} href='/' fontSize="lg" fontWeight="bold" color="primary">
                        Home
                    </Link>
                </Button>
                {/* <Button variant="ghost">
                    Explore
                </Button>
                <Button variant="ghost">
                    Notifications
                </Button> */}
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
            </HStack>
            <SubmissionModal isOpen={modalDisplayed} onClose={() => setModalDisplayed(false)} />
        </Box>
    );
}

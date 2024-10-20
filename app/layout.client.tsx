'use client';

import { supabaseAdmin } from '@/app/lib/supabase';
import { Box, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import Header from "./components/layout/Header";

export default function ClientLayout({

    children,
}: {
    children: React.ReactNode,
}) {
    const toast = useToast();

    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session }, error } = await supabaseAdmin.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error.message);
            } else {
                console.log('Session:', session);
                setIsAuthenticated(!!session); 
            }
        };

        checkSession();
    }, []);


    const handleLogout = async () => {
        const { error } = await supabaseAdmin.auth.signOut();
        if (error) {
            console.error('Erro ao sair:', error.message);
        } else {
            setIsAuthenticated(false);
            toast({
                title: "Logout",
                description: "You have exited successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction={{ base: 'column', md: 'row' }}>
            <Box flex="1">
                <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                {children}
            </Box>
        </Flex>
    );
}

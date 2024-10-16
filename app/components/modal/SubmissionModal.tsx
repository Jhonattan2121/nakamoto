'use client';
import { supabase } from '@/app/lib/supabase';
import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
    Textarea,
    VStack,
    useTheme
} from '@chakra-ui/react';
import React, { useState } from 'react';

interface SubmitFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubmitFormModal: React.FC<SubmitFormModalProps> = ({ isOpen, onClose }) => {
    const [productSuggestions, setProductSuggestions] = useState<any[]>([]);
    const { colors } = useTheme();
    
    const [formData, setFormData] = useState({
        stampId: '',
        stampUrl: '',
        artist: '',
        email: '',
        socialMediaHandle: '',
        description: '',
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimize = () => {
        setIsMinimized(true);
        setIsMaximized(false);
    };

    const handleMaximize = () => {
        setIsMaximized(true);
        setIsMinimized(false);
    };

    const handleClose = () => {
        setIsMaximized(false);
        setIsMinimized(false);
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        if (name === 'stampId') {
            fetchProductSuggestions(value); 
        }
    };

    const handleSubmit = async () => {
        if (!formData.artist || !formData.socialMediaHandle || !formData.stampId || !formData.description || !formData.stampUrl) {
            console.error("Required fields are missing.");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('stamps')
                .insert([{
                    stampId: formData.stampId,
                    stampUrl: formData.stampUrl, 
                    artist: formData.artist,
                    email: formData.email,
                    socialMediaHandle: formData.socialMediaHandle,
                    description: formData.description,
                }]);

            if (error) {
                throw new Error(error.message);
            }

            console.log("Data successfully submitted to Supabase:", data);

            setFormData({
                stampId: '',
                stampUrl: '',
                artist: '',
                email: '',
                socialMediaHandle: '',
                description: '',
            });
            onClose();
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    const fetchProductSuggestions = async (query: string) => {
        if (!query) {
            setProductSuggestions([]);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('products')
                .select('STAMP_Asset,  Creator_Name') 
                .ilike('STAMP_Asset', `%${query}%`); 
    
            if (error) {
                console.error('Error fetching products:', error);
                return;
            }
    
            setProductSuggestions(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered size={isMaximized ? '100%' : isMinimized ? 'sm' : 'md'}>
            <ModalOverlay />
            <ModalContent
                bg={colors.background}
                border="1px solid"
                borderColor={colors.border}
                boxShadow="none"
                borderRadius="0"
                maxW="600px"
                w="100%"
            >
                <HStack bg={colors.primary} p={3} justifyContent="space-between" alignItems="center" borderTopRadius="none">
                    <Text flex="1" textAlign="center" fontSize="lg" fontWeight="bold" color="black">
                        Submit Your Art
                    </Text>
                    <HStack spacing={3}>
                        <Button size="sm" bg={colors.background} color={colors.text} border={`1px solid ${colors.border}`} borderRadius="none" onClick={handleMinimize}>
                            _
                        </Button>
                        <Button size="sm" bg={colors.background} color={colors.text} border={`1px solid ${colors.border}`} borderRadius="none" onClick={handleMaximize}>
                            □
                        </Button>
                        <Button size="sm" bg={colors.background} color={colors.text} border={`1px solid ${colors.border}`} borderRadius="none" onClick={handleClose}>
                            X
                        </Button>
                    </HStack>
                </HStack>
                <ModalBody>
                    {errorMessage && <Text color="red.500">{errorMessage}</Text>}
                    {!isMinimized && (
                        <VStack spacing={4}>
                            <FormControl>
                                <FormLabel color={colors.text}>Stamp ID #</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="stampId"
                                        value={formData.stampId}
                                        onChange={handleChange}
                                        borderColor={colors.border}
                                        color={colors.text}
                                        placeholder="Enter Stamp ID"
                                        required
                                    />
                                </InputGroup>
                                {productSuggestions.length > 0 && (
                                    <VStack
                                        border="1px solid"
                                        borderColor={colors.border}
                                        borderRadius="md"
                                        bg={colors.background}
                                        w="100%"
                                        maxH="200px"
                                        overflowY="auto"
                                        spacing={1}
                                    >
                                        {productSuggestions.map((product) => (
                                            <Text
                                                key={product.STAMP_Asset}
                                                w="100%"
                                                p={2}
                                                cursor="pointer"
                                                _hover={{ bg: colors.primary, color: colors.background }}
                                                onClick={() => {
                                                    setFormData({
                                                        ...formData,
                                                        stampId: product.STAMP_Asset,
                                                        artist: product.Creator_Name, 
                                                    });
                                                    setProductSuggestions([]); 
                                                }}
                                            >
                                                {product.STAMP_Asset} - {product.name}
                                            </Text>
                                        ))}
                                    </VStack>
                                )}
                            </FormControl>
                            <FormControl>
                                <FormLabel color={colors.text}>Stamp URL</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="stampUrl"
                                        borderColor={colors.border}
                                        value={formData.stampUrl}
                                        onChange={handleChange}
                                        color={colors.text}
                                        placeholder="Enter Stamp URL"
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel color={colors.text}>Artist</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="artist"
                                        borderColor={colors.border}
                                        value={formData.artist}
                                        color={colors.text}
                                        placeholder="Enter Artist Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel color={colors.text}>Email</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="email"
                                        name="email"
                                        borderColor={colors.border}
                                        value={formData.email}
                                        color={colors.text}
                                        placeholder="Enter Your Email"
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel color={colors.text}>Social Media Handle</FormLabel>
                                <InputGroup>
                                    <Input
                                        type="text"
                                        name="socialMediaHandle"
                                        borderColor={colors.border}
                                        color={colors.text}
                                        placeholder="Enter Social Media Handle"
                                        value={formData.socialMediaHandle}
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel color={colors.text}>Description</FormLabel>
                                <InputGroup>
                                    <Textarea
                                        name="description"
                                        bg={colors.muted}
                                        borderColor={colors.border}
                                        value={formData.description}
                                        onChange={handleChange}
                                        color={colors.text}
                                        placeholder="Enter Description"
                                        minHeight="150px"
                                        resize="vertical"
                                        fontSize="md"
                                    />
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button bg={colors.primary} color={colors.background} border={`1px solid ${colors.border}`} onClick={handleSubmit}>
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SubmitFormModal;

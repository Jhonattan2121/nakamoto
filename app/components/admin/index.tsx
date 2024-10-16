'use client';
import { supabaseAdmin } from '@/app/lib/supabase';
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    Heading,
    HStack,
    Image,
    Input,
    Select,
    Spinner,
    Text,
    VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';


interface Product {
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

interface Stamp {
    stampId: string;
    stampUrl: string[];
    artist: string;
    email: string;
    socialMediaHandle: string;
    description: string;
}


export default function Admin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [epochs, setEpochs] = useState<Epoch[]>([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState<Product>({
        STAMP_Asset: '',
        Creator_Name: "",
        Top: 0,
        Title: '',
        Rarity_Score: 0,
        imageUrls: [],
        epoch_name: '',
        epoch_index: '',

    });
   
    const [raritys, setRaritys] = useState<string[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentSection, setCurrentSection] = useState<'Stamps Submit' | 'products'>('Stamps Submit');
    const [stamps, setStamps] = useState<Stamp[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const placeholderImage = "https://via.placeholder.com/150";

    const fetchData = async () => {
        const [ { data: productsData }, { data: epochsData }, { data: raritysData }, { data: stampsData }] = await Promise.all([
            supabaseAdmin.from('products').select('*'),
            supabaseAdmin.from('epochs').select('*'),
            supabaseAdmin.from('raritys').select('title'),
            supabaseAdmin.from('stamps').select('*'), 
        ]);
    
        console.log('Stamps Data:', stampsData);
    
        setProducts(productsData?.map(product => ({
            ...product,
            imageUrls: Array.isArray(product.imageUrls) ? product.imageUrls : product.imageUrls ? product.imageUrls.split(', ') : []
        })) || []);
        setEpochs(epochsData || []);
        setRaritys(raritysData?.map(rarity => rarity.title) || []);
    
        const formattedStamps = stampsData?.map(stamp => ({
            ...stamp,
            stampUrl: Array.isArray(stamp.stampUrl) 
            ? stamp.stampUrl 
            : typeof stamp.stampUrl === 'string' 
                ? (stamp.stampUrl.trim().startsWith('[') ? JSON.parse(stamp.stampUrl) : [stamp.stampUrl]) 
                : []
                })) || [];
    
        console.log('Formatted Stamps:', formattedStamps);
        setStamps(formattedStamps);
        setLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, []);


   

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const imageUrls = imageFile ? await uploadImage(imageFile) : [];

        const { data, error } = await supabaseAdmin
            .from('products')
            .insert([{
                STAMP_Asset: newProduct.STAMP_Asset,
                Creator_Name: newProduct.Creator_Name,
                Top: newProduct.Top,
                Title: newProduct.Title,
                Rarity_Score: newProduct.Rarity_Score,
                imageUrls: imageUrls,
                epoch_name: newProduct.epoch_name,
                epoch_index: newProduct.epoch_index
            }]);

        if (error) {
            console.error('Supabase insert error:', error.message);
        } else {
            setProducts(prev => [...prev, ...(data || [])]);
        }

        setNewProduct({ STAMP_Asset: '', Creator_Name: "", Top: 0, Title: "", Rarity_Score: 0, imageUrls: [], epoch_name: '', epoch_index: '' });
        setImageFile(null);
    };

    const uploadImage = async (file: File): Promise<string[]> => {
        const { data: uploadData, error } = await supabaseAdmin.storage.from('images').upload(`public/${file.name}`, file);

        if (error) {
            console.error('Image upload error:', error.message);
            return [];
        }

        return uploadData?.path ? [supabaseAdmin.storage.from('images').getPublicUrl(uploadData.path).data.publicUrl] : [];
    };

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabaseAdmin.auth.getSession();
            if (session) {
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkSession();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const { data, error } = await supabaseAdmin.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (error) {
            alert('Nome de usuário ou senha incorretos');
            console.error('Erro de autenticação:', error.message);
        } else {
            setIsAuthenticated(true);
        }
    };

    const handleLogout = async () => {
        const { error } = await supabaseAdmin.auth.signOut();
        if (error) {
            console.error('Erro ao sair:', error.message);
        } else {
            setIsAuthenticated(false);
            setUsername('');
            setPassword('');
        }
    };


    if (loading) {
        return <Spinner color="teal.300" size="xl" />;
    }


    return (
        <Box bg="#0a0e0b" color="white" minH="100vh" p={5}>
            <Box maxW="1200px" mx="auto" w="full">
                <Heading mb={6} textAlign="center" color="teal.400">Admin Panel</Heading>

                {!isAuthenticated ? (
                    <form onSubmit={handleLogin}>
                        <FormControl mb={4}>
                            <Input
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Email do Admin"
                                required
                                bg="gray.700"
                                color="white"
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Senha"
                                required
                                bg="gray.700"
                                color="white"
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" width="100%">Login</Button>
                    </form>
                ) : (
                    <>
                        <Button
                            onClick={handleLogout}
                            colorScheme="red"
                            mb={4}
                            size="lg"
                            leftIcon={<FaSignOutAlt />}
                            borderRadius="md"
                            boxShadow="md"
                            _hover={{ bg: "red.600", transform: "scale(1.05)", transition: "0.2s" }}
                        >
                            Logout
                        </Button>
                        {loading ? (
                            <Spinner color="teal.300" size="xl" />
                        ) : (
                            <>
                                <ButtonGroup mb={10} variant="outline" colorScheme="teal" size="lg" isAttached>
                                    <Button onClick={() => setCurrentSection('Stamps Submit')} isActive={currentSection === 'Stamps Submit'}>Stamps Submit</Button>
                                    <Button onClick={() => setCurrentSection('products')} isActive={currentSection === 'products'}>Products</Button>
                                </ButtonGroup>

                                {currentSection === 'Stamps Submit' && (
                                <VStack spacing={4} align="stretch" mb={10}>
                                    <Heading as="h3" size="lg" textAlign="center">All Stamps</Heading>
                                    {stamps.length === 0 ? (
                                        <Text textAlign="center">Nenhum selo encontrado.</Text>
                                    ) : (
                                        stamps.map((stamp) => (
                                            <Box key={stamp.stampId} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
                                                <Text fontWeight="bold">Artist: {stamp.artist}</Text>
                                                <Text>Email: {stamp.email}</Text>
                                                <Text>Social Media Handle: {stamp.socialMediaHandle}</Text>
                                                <Text>Description: {stamp.description}</Text>
                                                <Text>Stamp ID: {stamp.stampId}</Text>
                                                <Image 
                                                    src={stamp.stampUrl.length > 0 ? stamp.stampUrl[0] : placeholderImage} 
                                                    alt={stamp.stampId} 
                                                    boxSize="150px" 
                                                    objectFit="cover" 
                                                    borderRadius="md" 
                                                />
                                            </Box>
                                        ))
                                    )}
                                </VStack>
                            )}



                                {currentSection === 'products' && (
                                    <Box>
                                        <Heading size="lg" mb={4} textAlign="center" color="teal.400">Create Product</Heading>
                                        <form onSubmit={handleProductSubmit}>
                                            <FormControl mb={4}>
                                                <Input
                                                    type='text'
                                                    value={newProduct.STAMP_Asset}
                                                    onChange={(e) => setNewProduct({ ...newProduct, STAMP_Asset: e.target.value })}
                                                    placeholder="Product Stamp"
                                                    required
                                                    bg="gray.700"
                                                    color="white"
                                                />
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <Input
                                                    type='text'
                                                    value={newProduct.Creator_Name}
                                                    onChange={(e) => setNewProduct({ ...newProduct, Creator_Name: e.target.value })}
                                                    placeholder="Creator Name"
                                                    required
                                                    bg="gray.700"
                                                    color="white"
                                                />
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <Input
                                                    type="number"
                                                    value={newProduct.Rarity_Score}
                                                    onChange={(e) => setNewProduct({ ...newProduct, Rarity_Score: Number(e.target.value) })}
                                                    placeholder="Product Rarity Score"
                                                    required
                                                    bg="gray.700"
                                                    color="white"
                                                />
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <Select
                                                    value={newProduct.Title}
                                                    onChange={(e) => setNewProduct({ ...newProduct, Title: e.target.value })}
                                                    placeholder="Select Rarity"
                                                    required
                                                >
                                                    {raritys.map((rarity) => (
                                                        <option key={rarity} value={rarity} style={{ background: '#2d3748', color: 'white' }}>
                                                            {rarity}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <FormControl mb={4}>
                                                <Select
                                                    value={newProduct.epoch_name}
                                                    onChange={(e) => setNewProduct({ ...newProduct, epoch_name: e.target.value })}
                                                    required
                                                    placeholder="Select Epoch"
                                                >
                                                    {epochs.map((epoch) => (
                                                        <option key={epoch.epoch_name} value={epoch.epoch_name} style={{ background: '#2d3748', color: 'white' }}>
                                                            {epoch.epoch_name}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <Select
                                                    value={newProduct.epoch_index}
                                                    onChange={(e) => setNewProduct({ ...newProduct, epoch_index: e.target.value })}
                                                    required
                                                    placeholder="Select Index"
                                                >
                                                    {epochs.find(e => e.epoch_name === newProduct.epoch_name)?.indices.map((index) => (
                                                        <option key={index} value={index} style={{ background: '#2d3748', color: 'white' }}>
                                                            {index}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <Input
                                                    type="number"
                                                    value={newProduct.Top}
                                                    onChange={(e) => setNewProduct({ ...newProduct, Top: Number(e.target.value) })}
                                                    placeholder="Product Top"
                                                    required
                                                    bg="gray.700"
                                                    color="white"
                                                />
                                            </FormControl>
                                            <FormControl mb={4}>
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                                    bg="gray.700"
                                                    color="white"
                                                />
                                            </FormControl>

                                            <Button type="submit" colorScheme="teal" width="100%">Submit Product</Button>
                                        </form>

                                        <Heading size="lg" mt={10} mb={4} textAlign="center" color="teal.400">Products</Heading>

                                        <VStack spacing={6} align="stretch">
                                            {products.map((product) => (
                                                <Box
                                                    key={product.STAMP_Asset}
                                                    bg="gray.800"
                                                    p={5}
                                                    borderRadius="lg"
                                                    shadow="lg"
                                                    _hover={{ bg: "gray.700" }}
                                                    transition="background-color 0.2s ease"
                                                >
                                                    <HStack spacing={4} alignItems="flex-start">
                                                        <Image
                                                            src={product.imageUrls.length > 0 ? product.imageUrls[0] : placeholderImage}
                                                            alt={product.STAMP_Asset}
                                                            boxSize="150px"
                                                            objectFit="cover"
                                                            borderRadius="md"
                                                        />
                                                        <Box>
                                                            <Text fontSize="xl" fontWeight="bold" color="teal.300">Stamp {product.STAMP_Asset}</Text>
                                                            <Text>Creator {product.Creator_Name}</Text>
                                                            <Text>Top {product.Top}</Text>
                                                            <Text>Rarity Score {product.Rarity_Score}</Text>
                                                            <Text>Rarity Title {product.Title}</Text>
                                                            <Text>Epoch {product.epoch_name}</Text>
                                                            <Text>Index {product.epoch_index}</Text>
                                                        </Box>
                                                    </HStack>
                                                </Box>
                                            ))}
                                        </VStack>
                                    </Box>
                                )}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
}

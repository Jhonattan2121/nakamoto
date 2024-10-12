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

interface Post {
    title: string;
    body: string;
    author: string;
    created: string;
}

interface Product {
    STAMP_Asset: string;
    Top: number;
    Rarity_TItle: string;
    Rarity_Score: number;
    imageUrls: string[];
    epoch_name: string;  // Novo campo
    epoch_index: string;       // Novo campo
}

interface Epoch {
    epoch_name: string;
    indices: string[];
}

export default function Admin() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [epochs, setEpochs] = useState<Epoch[]>([]); // Estado para armazenar epochs
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState<Post>({ title: '', body: '', author: '', created: new Date().toISOString() });
    const [newProduct, setNewProduct] = useState<Product>({
        STAMP_Asset: '',
        Top: 0,
        Rarity_TItle: '',
        Rarity_Score: 0,
        imageUrls: [],
        epoch_name: '', 
        epoch_index: '',      
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentSection, setCurrentSection] = useState<'posts' | 'products'>('posts');

    const placeholderImage = "https://via.placeholder.com/150";

    useEffect(() => {
        const fetchData = async () => {
            const [{ data: postsData }, { data: productsData }, { data: epochsData }] = await Promise.all([
                supabaseAdmin.from('posts').select('*'),
                supabaseAdmin.from('products').select('*'),
                supabaseAdmin.from('epochs').select('*'), 
            ]);

            setPosts(postsData || []);
            setProducts(productsData?.map(product => ({
                ...product,
                imageUrls: Array.isArray(product.imageUrls) ? product.imageUrls : product.imageUrls ? product.imageUrls.split(', ') : []
            })) || []);
            setEpochs(epochsData || []); 
            setLoading(false);
        };

        fetchData();
    }, []);

    const handlePostSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data } = await supabaseAdmin.from('posts').insert([{ ...newPost }]);
        if (data) {
            setPosts(prev => [...prev, ...data]);
        }
        setNewPost({ title: '', body: '', author: '', created: new Date().toISOString() });
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const imageUrls = imageFile ? await uploadImage(imageFile) : [];

        const { data, error } = await supabaseAdmin
            .from('products')
            .insert([{
                STAMP_Asset: newProduct.STAMP_Asset,
                Top: newProduct.Top,
                Rarity_TItle: newProduct.Rarity_TItle,
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

        setNewProduct({ STAMP_Asset: '', Top: 0, Rarity_TItle: "", Rarity_Score: 0, imageUrls: [], epoch_name: '', epoch_index: '' });
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

    return (
        <Box bg="#0a0e0b" color="white" minH="100vh" p={5}>
            <Box maxW="1200px" mx="auto" w="full">
                <Heading mb={6} textAlign="center" color="teal.400">Admin Panel</Heading>

                {loading ? (
                    <Spinner color="teal.300" size="xl" />
                ) : (
                    <>
                        <ButtonGroup mb={10} variant="outline" colorScheme="teal" size="lg" isAttached>
                            <Button onClick={() => setCurrentSection('posts')} isActive={currentSection === 'posts'}>Posts</Button>
                            <Button onClick={() => setCurrentSection('products')} isActive={currentSection === 'products'}>Products</Button>
                        </ButtonGroup>

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
                                            value={newProduct.Rarity_TItle}
                                            onChange={(e) => setNewProduct({ ...newProduct, Rarity_TItle: e.target.value })}
                                            required
                                        >
                                            <option value="Common" style={{ background: '#2d3748', color: 'white' }}>Common</option>
                                            <option value="Rare" style={{ background: '#2d3748', color: 'white' }}>Rare</option>
                                            <option value="Epic" style={{ background: '#2d3748', color: 'white' }}>Epic</option>
                                            <option value="Legendary" style={{ background: '#2d3748', color: 'white' }}>Legendary</option>
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
                                            {/* Mostra os índices do epoch selecionado */}
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
                                                    <Text>Top {product.Top}</Text>
                                                    <Text>Rarity Score {product.Rarity_Score}</Text>
                                                    <Text>Rarity Title {product.Rarity_TItle}</Text>
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
            </Box>
        </Box>
    );
}

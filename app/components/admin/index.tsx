'use client';
import { supabaseAdmin } from '@/app/lib/supabase';
import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    Spinner,
    Text,
    Textarea,
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
    name: string;
    description: string;
    price: number;
    imageUrls: string[];
    stock: number;
    category: string;
    created: string;
}

export default function Admin() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [newPost, setNewPost] = useState<Post>({ title: '', body: '', author: '', created: new Date().toISOString() });
    const [newProduct, setNewProduct] = useState<Product>({ name: '', description: '', category: "", price: 0, imageUrls: [], stock: 0, created: new Date().toISOString() });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentSection, setCurrentSection] = useState<'posts' | 'products'>('posts'); // Novo estado

    // Placeholder image URL
    const placeholderImage = "https://via.placeholder.com/150";

    useEffect(() => {
        const fetchData = async () => {
            const [{ data: postsData }, { data: productsData }] = await Promise.all([
                supabaseAdmin.from('posts').select('*'),
                supabaseAdmin.from('products').select('*')
            ]);

            setPosts(postsData || []);
            setProducts(productsData?.map(product => ({
                ...product,
                imageUrls: Array.isArray(product.imageUrls) ? product.imageUrls : product.imageUrls ? product.imageUrls.split(', ') : []
            })) || []);
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

        const { data } = await supabaseAdmin.from('products').insert([{ ...newProduct, imageUrls }]);
        if (data) {
            setProducts(prev => [...prev, ...data]);
        }

        setNewProduct({ name: '', description: '', category: "", price: 0, imageUrls: [], stock: 0, created: new Date().toISOString() });
        setImageFile(null);
    };

    const uploadImage = async (file: File): Promise<string[]> => {
        const { data: uploadData } = await supabaseAdmin.storage.from('images').upload(`public/${file.name}`, file);
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
                        {/* Seletor de seção */}
                        <ButtonGroup mb={10} variant="outline" colorScheme="teal" size="lg" isAttached>
                            <Button onClick={() => setCurrentSection('posts')} isActive={currentSection === 'posts'}>Posts</Button>
                            <Button onClick={() => setCurrentSection('products')} isActive={currentSection === 'products'}>Products</Button>
                        </ButtonGroup>

                        {/* Seção de Posts */}
                        {currentSection === 'posts' && (
                            <Box mb={10}>
                                <Heading size="lg" mb={4} textAlign="center" color="teal.400">Create Post</Heading>
                                <form onSubmit={handlePostSubmit}>
                                    <FormControl mb={4}>
                                        <FormLabel>Title</FormLabel>
                                        <Input
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            placeholder="Post Title"
                                            required
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Author</FormLabel>
                                        <Input
                                            value={newPost.author}
                                            onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                                            placeholder="Author"
                                            required
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Content</FormLabel>
                                        <Textarea
                                            value={newPost.body}
                                            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                                            placeholder="Post Content"
                                            required
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <Button type="submit" colorScheme="teal" width="100%">Submit Post</Button>
                                </form>

                                <Heading size="lg" mt={10} mb={4} textAlign="center" color="teal.400">Posts</Heading>
                                <VStack spacing={4} align="stretch">
                                    {posts.map((post) => (
                                        <Box key={`${post.author}-${post.created}`} bg="gray.800" p={4} borderRadius="md" shadow="md">
                                            <Text fontSize="xl" fontWeight="bold" color="teal.300">{post.title}</Text>
                                            <Text>Author: {post.author}</Text>
                                            <Text>Creation Date: {new Date(post.created).toLocaleDateString()}</Text>
                                            <Text mt={2} noOfLines={3}>{post.body}</Text>
                                        </Box>
                                    ))}
                                </VStack>
                            </Box>
                        )}

                        {/* Seção de Produtos */}
                        {currentSection === 'products' && (
                            <Box>
                                <Heading size="lg" mb={4} textAlign="center" color="teal.400">Create Product</Heading>
                                <form onSubmit={handleProductSubmit}>
                                    <FormControl mb={4}>
                                        <FormLabel>Product Name</FormLabel>
                                        <Input
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            placeholder="Product Name"
                                            required
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Description</FormLabel>
                                        <Input
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            placeholder="Product Description"
                                            required
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Category</FormLabel>
                                        <Input
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                            placeholder="Product Category"
                                            required
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Price</FormLabel>
                                        <Input
                                            type="number"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                            placeholder="Product Price"
                                            required
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Upload Image</FormLabel>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            bg="gray.700"
                                            color="white"
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Stock</FormLabel>
                                        <Input
                                            type="number"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                                            placeholder="Quantity in Stock"
                                            required
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
                                            key={`${product.name}-${product.created}`}
                                            bg="gray.800"
                                            p={5}
                                            borderRadius="lg"
                                            shadow="lg"
                                            _hover={{ bg: "gray.700" }}
                                            transition="background-color 0.2s ease"
                                        >
                                            <HStack spacing={4} alignItems="flex-start">
                                                <Image
                                                    src={product.imageUrls[0] || placeholderImage}
                                                    alt={product.name}
                                                    boxSize="150px"
                                                    objectFit="cover"
                                                    borderRadius="md"
                                                />
                                                <Box>
                                                    <Text fontSize="xl" fontWeight="bold" color="teal.300">{product.name}</Text>
                                                    <Text>Description: {product.description}</Text>
                                                    <Text>Category: {product.category}</Text>
                                                    <Text>Price: $ {product.price.toFixed(2)}</Text>
                                                    <Text>Stock: {product.stock}</Text>
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

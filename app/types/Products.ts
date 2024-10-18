export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrls: Record<string, any>;
    category: string;
    stock: number;
    rating: number;
    width?: number;   
    height?: number;
    stamp?: number;
}

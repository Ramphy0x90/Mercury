export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string;
    rating: number
    tag: string;
    price: number;
    attributes: number | null;
    product_nodes: number | null
}

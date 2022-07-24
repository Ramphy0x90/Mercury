export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    category: number;
    rating: number
    tag: string;
    price: number;
    attributes: number | null;
    product_nodes: number | null
}

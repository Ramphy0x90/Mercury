export interface Product {
    _id: number | null;
    name: string;
    description: string;
    image: string;
    category: number;
    rating: number
    tag: string;
    price: number;
    attributes: number | null;
    product_nodes: number | null,
    visible: boolean
}

export interface SubProduct {
    _id: number | null;
    fk_product: number;
    name: string | null;
    quantity: number;
}

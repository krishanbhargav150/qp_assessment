export interface Order {
    buyerName: string;
    items: Array<OrderItem>
}

export interface OrderItem {
    productErpId: string;
    MRP: number;
    price: number;
    quantity: number;
}
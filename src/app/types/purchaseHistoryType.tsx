export type OrderHistoryResponse = {
    date: string; // ISO datetime string
    code: number; // HTTP status code
    message: string; // API response message
    data: Order[]; // Array of orders
};

export type Order = {
    uuid: string; // Unique identifier for the order
    order_code: string; // Unique order code
    delivery_price: number | null; // Delivery price, nullable
    sub_total_price: string; // Subtotal price as string
    total_price: string; // Total price as string
    status: "processing" | "completed" | "cancelled"; // Status of the order (assuming these as possible values)
    delivery_method: string; // Delivery method description
    delivery_date: string; // Delivery date as string (ISO format)
    created_at: string; // Order creation timestamp
    coupon: Coupon; // Coupon code if applied, nullable
    items: OrderItem[]; // Array of items in the order
};

export type OrderItem = {
    product_uuid: string; // Unique identifier for the product
    product_name: string; // Name of the product
    quantity: number; // Quantity of the product
    original_price: string; // Original price as string
    discounted_price: string | number; // Discounted price (can be string or number as per the data)
    total_price: number; // Total price for the item
    is_preorder: boolean; // Whether the item is a pre-order
    image: string; // URL or path to the product image
};

export type Coupon={
     code: string,
     discount_percentage: number;
}


// get by uuid
  
  export type OrderDetail = {
    date: string;
    code: number;
    message: string;
    data: DetailOrder;
  }
  export type DetailOrder = {
    uuid: string; // Unique identifier for the order
    order_code: string; // Unique order code
    delivery_fee: number | null; // Delivery price, nullable
    sub_total_price: string; // Subtotal price as string
    total_price: string; // Total price as string
    status: "processing" | "completed" | "cancelled"; // Status of the order (assuming these as possible values)
    delivery_method: string; // Delivery method description
    delivery_date: string; // Delivery date as string (ISO format)
    created_at: string; // Order creation timestamp
    coupon: Coupon; // Coupon code if applied, nullable
    items: OrderItem[]; // Array of items in the order
};
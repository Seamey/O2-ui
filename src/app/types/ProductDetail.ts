export type ProductDetail = {
    images: string[];
};


export type DataType = {
    uuid: string;
    category_name: string;
    name: string;
    description: string;
    price: number;
    discount_percentage: string;
    discounted_price: number;
    stock: number;
    is_recommended: number;
    average_rating: number;
    single_image: string;
    images: string[];
    created_at: string;
    updated_at: string;
}

export type RecommendationType = {
    data: {
        data: DataType[];
    };
};


// Updated types based on your API response
export type DataSelect = {
    data: MainSelect[];
}

export type MainSelect = {
    uuid: string;
    name: string;
    subcategories: SubSelect[];
}

export type SubSelect = {
    uuid: string;
    name: string;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

type DiscountData = {
    uuid: string;
    name: string;
    image: string;
    discount_percentage: string;
}

export type DiscountBannerType = {
    data: DiscountData[];
}


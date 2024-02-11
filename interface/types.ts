export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  brand: string;
  category: string;
  images: String[];
}

export interface CartProduct {
  id: string;
  userId: string;
  itemId: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  brand: string;
  category: string;
  images: String[];
  present: number;
}

export interface Product {
  name: string;
  description: string;
  defaultImage: string;
  tryOnImage: string;
  canTryOn: boolean;
  edgeImage: string;
  totalSold: number;
  category: Category;
  brand: Brand;
  tryOnImageResult?: any;
  properties: any[];
  images: any[];
  productVariants: any[];
  id: number;
  isDeleted: boolean;
  createAt: string;
  updateAt: string;
  updateBy: string;
  createBy: string;
}

export interface FilterParams {
  name?: any;
  category?: any;
  subCategory?: any;
  color?: any;
  size?: any;
  minPrice?: any;
  maxPrice?: any;
}

export interface Brand {
  name: string;
  id: number;
  isDeleted: boolean;
  createAt: string;
  updateAt: string;
  updateBy: string;
  createBy: string;
}

export interface Category {
  name: string;
  subCategories: any[];
  id: number;
  isDeleted: boolean;
  createAt: string;
  updateAt: string;
  updateBy: string;
  createBy: string;
}

export interface CartData {
  userId: string | null | undefined;
  productId: any;
  cartId: string | null | undefined;
  color: string;
  size: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface CartItem {
  cartId: any;
  productId: number;
  color: string;
  size: string;
  price: number;
  quantity: number;
  product: Product;
  sku: string;
}

// interface RootObject {
//   data: Data;
//   isSuccess: boolean;
//   message: string;
//   validationErrors?: any;
// }

// interface Data {
//   cartItems: CartItem[];
//   createAt: string;
//   createBy?: any;
//   id: number;
//   isDeleted: boolean;
//   updateAt: string;
//   updateBy?: any;
//   userId: string;
// }

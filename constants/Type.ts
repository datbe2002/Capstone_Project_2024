export interface Products {
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
}

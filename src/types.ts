export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  specifications: ProductSpec[];
  images: string[];
  featured?: boolean;
  relatedIds: string[];
}

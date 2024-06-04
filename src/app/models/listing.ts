import {Seller} from "./seller";

export interface Listing {
  id: number;
  title: string;
  price: number;
  isNegotiable: boolean;
  categoryId: string;
  categoryName: string;
  quality: Quality;
  description: string;
  imageKeys: string[];
  createdAt: string;
  seenCount: number;
  sellerProfile: Seller;
}

export enum Quality {
  USED = 'used',
  NEW = 'new'
}

import {Seller} from "./seller";

export interface Listing {
  title: string;
  price: number;
  isNegotiable: boolean;
  categoryId: string;
  categoryName: string;
  quality: string;
  description: string;
  imageKeys: string[];
  createdAt: string;
  seenCount: number;
  sellerProfile: Seller;
}

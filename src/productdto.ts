import { ProductRegionDto, ProductTypeDto } from './app/shared/models/dto';

export interface ProductDto {
  productId?: number;
  orderId?: number;
  productTitle: string;
  productPrice: number;
  productImage: string;
  quantity?: number;
  enrolledDate?: Date; // set automaticaly in back end
  productIsSelected?: boolean;
  userId: any; // from route
  guId?: number;
  productRegion: string;
  productType: string;
}

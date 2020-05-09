import { IProduct } from './products/product';
import { ProductDto } from '../../../productdto';

export interface Order {
  orderId?: number;
  enrolledDate?: Date;
  userId?: any;
  productsDto?: Array<IProduct>;
  isOpened?: boolean;
}

import { IAddress } from '../user/address';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: IAddress;
}

export interface IOrder {
  id: number;
  byerEmail: string;
  shipToAddress: IAddress;
  deliveryMethod: number;
  deliveryPrice: number;
  orderItems: IOrderItem[];
  subtotal: string;
  status: string;
  paymentIntentId: string;
  orderDate: string;
}

export interface IOrderItem {
  id: number;
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}
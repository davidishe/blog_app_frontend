export interface IProduct {
  id?: number;
  name: string;
  description?: string;
  productPrice: number;
  pictureUrl: string;
  quantity?: number;
  productIsSelected?: boolean;
  productType?: string;
  productRegion?: string;
  enrolledDate?: Date;
  guId?: number;
}

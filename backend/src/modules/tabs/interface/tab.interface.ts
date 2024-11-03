export interface ITabItem {
  id: string;
  name: string;
  pricePerUnit: number;
  description?: string;
  category?: string;
}

export interface ITab {
  items: ITabItem[];
  serviceFee: number;
  restaurantName: string;
  tableNumber?: string;
  date: Date;
  subtotal: number;
  total: number;
}

export interface ITab {
  total: number;
  serviceFee: number;
  items: IItem[];
}

export interface IItem {
  id: string;
  name: string;
  totalAmount: number;
  pricePerUnit: number;
}

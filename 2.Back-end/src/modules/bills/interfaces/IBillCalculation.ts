export interface IUserBill {
  userId: string;
  userName: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  serviceFeeShare: number;
  total: number;
}

export interface IBillCalculation {
  users: IUserBill[];
  sessionTotal: number;
  serviceFeePaid: number;
  grandTotal: number;
} 
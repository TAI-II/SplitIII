import { Injectable, Logger } from '@nestjs/common';
import { IBillCalculation, IUserBill } from './interfaces/IBillCalculation';
import { ISessionUser } from '../sessions/interfaces/ISessionUser';
import { ISession } from '../sessions/interfaces/ISession';

@Injectable()
export class BillCalculatorService {
  private readonly logger = new Logger(BillCalculatorService.name);

  calculateBill(session: Partial<ISession>): IBillCalculation {
    const { tab, sessionUsers } = session;
    const result: IBillCalculation = {
      users: [],
      sessionTotal: 0,
      serviceFeePaid: 0,
      grandTotal: 0,
    };
    try {
      // Calculate each user's bill
      sessionUsers.forEach((user) => {
        const userBill = this.calculateUserBill(user, tab);
        result.users.push(userBill);
        result.sessionTotal += userBill.subtotal;
      });

      // Calculate service fee share for each user
      const serviceFeePerUser = tab.serviceFee / sessionUsers.length;
      result.users.forEach((userBill) => {
        userBill.serviceFeeShare = serviceFeePerUser;
        userBill.total = userBill.subtotal + serviceFeePerUser;
        result.serviceFeePaid += serviceFeePerUser;
      });

      result.grandTotal = result.sessionTotal + result.serviceFeePaid;

      return result;
    } catch (error) {
      this.logger.error('Error calculating bill', error);
      throw new Error('Failed to calculate bill');
    }
  }

  private calculateUserBill(user: ISessionUser, tab: any): IUserBill {
    const userBill: IUserBill = {
      userId: user.userId.toString(),
      userName: user.name,
      items: [],
      subtotal: 0,
      serviceFeeShare: 0,
      total: 0,
    };

    user.selectedItems.forEach((selectedItem) => {
      const tabItem = tab.items.find((item) => item.id == selectedItem.id);
      if (tabItem) {
        const itemTotal = tabItem.pricePerUnit * selectedItem.quantity;
        userBill.items.push({
          id: tabItem.id,
          name: tabItem.name,
          quantity: selectedItem.quantity,
          unitPrice: tabItem.pricePerUnit,
          totalPrice: itemTotal,
        });
        userBill.subtotal += itemTotal;
      }
    });

    return userBill;
  }
}
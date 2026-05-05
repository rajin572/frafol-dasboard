import { IEventOrder } from "./eventOrder.type";
import { IGearOrder } from "./gearOrder.type";

export interface UserSummary {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface ITransaction {
  _id: string;
  transactionId: string;
  userId: UserSummary;
  serviceProviderId?: UserSummary;
  amount: number;
  originalCommission?: number;
  couponDiscount?: number;
  commission: number;
  netAmount: number;
  paymentStatus: "completed" | "pending" | "failed";
  paymentMethod: "stripe" | "paypal" | string;
  paymentType: "event" | "gear" | "workshop" | "subscription" | string;
  // event
  eventOrderId?: IEventOrder | string;
  // gear
  gearOrderIds: (IGearOrder | string)[];
  // subscription
  subscriptionDays?: number;
  serviceProviderPaid?: boolean;
  isRegisterAsCompany?: boolean;
  serviceProviders: UserSummary[];
  createdAt: string;
  updatedAt: string;
}

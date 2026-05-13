import { IEventOrder } from "./eventOrder.type";
import { IGearOrder } from "./gearOrder.type";

export interface UserSummary {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  companyName?: string;
  ico?: string;
  dic?: string;
  ic_dph?: string;
  address?: string;
  phone?: string;
}

export interface IGearItem {
  _id: string;
  name: string;
  price: number;
  vatAmount: number;
  totalVatAmount: number;
  platformCommission: number;
  mainPrice: number;
  shippingCompany?: {
    name: string;
    price: number;
  };
}

export interface ITransaction {
  _id: string;
  transactionId: string;
  // event / workshop / subscription
  userId?: UserSummary;
  serviceProviderId?: UserSummary;
  // gear
  client?: UserSummary;
  seller?: UserSummary;
  orderId?: string;
  gearOrderId?: string;
  gear?: IGearItem;
  totalPaymentAmount?: number;
  adminPaid?: boolean;
  orderStatus?: string;
  netEarning?: number;
  amount: number;
  originalCommission?: number;
  couponDiscount?: number;
  commission: number;
  netAmount?: number;
  paymentStatus: "completed" | "pending" | "failed";
  paymentMethod: "stripe" | "paypal" | string;
  paymentType: "event" | "gear" | "workshop" | "subscription" | string;
  // event
  eventOrderId?: IEventOrder | string;
  // gear (legacy)
  gearOrderIds?: (IGearOrder | string)[];
  // workshop
  workshopId?: {
    _id: string;
    title: string;
    date: string;
    time: string;
    vatAmount: number;
    price: number;
    mainPrice: number;
  } | string;
  // subscription
  subscriptionDays?: number;
  serviceProviderPaid?: boolean;
  isRegisterAsCompany?: boolean;
  serviceProviders?: UserSummary[];
  createdAt: string;
  updatedAt?: string;
}

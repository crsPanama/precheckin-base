// import { type Extra } from 'crs_layer/types/extra';

export type PaymentType = 'tarjeta' | 'PayPal';
export type PrecheckinStatus =
  | 'Pendiente de Prechecking'
  | 'Prechecking Pagado'
  | 'Cancelado';

export interface PrecheckinInfo {
  reservation: ReservationInfo;
  client_info: ClientInfo;
  prices: PricingInfo;
}

export interface ReservationInfo {
  id: number;
  status: PrecheckinStatus;
  Class: string;
  Res: string;
  Pickup_Date: Date;
  Pickup_Location: string;
  Pickup_Time: number;
  tipo_pago: PaymentType;
  Due_Date: Date;
  Due_Time: number;
  Due_Back_Location: string;
}

export interface ReservationLocationInfo {
  Pickup_Location: string;
  Due_Back_Location: string;
  Pickup_Location_Name: string;
  Dueback_Location_Name: string;
}

export interface ClientInfo {
  Renters_Email: string;
  Name: string;
  Phone_Number: string;
  Licencia: string;
}

export interface PricingInfo {
  airport_fee: number;
  ITBMS: number;
  subtotal: number;
  dropoff: number;
  Est_Total: number;
  Total: number;
  Era: number;
}

export type EstimatedTotal = Pick<PricingInfo, 'Est_Total'>;

import { WeekDays } from "./week-days";

export type Surcharge = {
  id: string;
  propertyId: string;
  surchargeTypeId: string;
  days: WeekDays[];
  startDate: string;
  endDate: string;
  amountCents: number;
  appliesPerNight: boolean
}
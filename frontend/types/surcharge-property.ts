import { WeekDays } from "./week-days";

export type SurchargeProperty = {
  id: string;
  propertyName: string;
  surchargeName: string;
  days: WeekDays[];
  startDate: string;
  endDate: string;
  amountCents: number;
  appliesPerNight: boolean;
}

import { WeekDays } from "./week-days";

export type RuleProperty = {
  id: string;
  propertyName: string;
  minGuests: number;
  maxGuests: number;
  pricePerNightCents: number;
  minNights: number;
  days: WeekDays[];
  startDate: string;
  endDate: string;
}


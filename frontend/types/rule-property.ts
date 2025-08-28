import { WeekDays } from "./week-days";

export type RuleProperty = {
  id: string;
  propertyName: string;
  minGuests: number;
  maxGuests: number;
  pricePerNightCents: string;
  minNights: number;
  days: WeekDays[];
  startDate: string;
  endDate: string;
  propertyId: string;
}


import { WeekDays } from "./week-days";

export type RateRule = {
  id: string;
  propertyId: string;
  startDate: Date,
  endDate: Date,
  days: WeekDays[],
  minGuests: number;
  maxGuests: number;
  pricePerNightCents: number;
  minNights: number;
}
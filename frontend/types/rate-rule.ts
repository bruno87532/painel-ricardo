import { WeekDays } from "./week-days";

export type RateRule = {
  id: string;
  propertyId: string;
  startDate: string,
  endDate: string,
  days: WeekDays[],
  minGuests: number;
  maxGuests: number;
  pricePerNightCents: number;
  minNights: number;
}
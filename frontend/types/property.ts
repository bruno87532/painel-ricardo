export type Property = {
  id: string;
  name: string;
  baseCapacity: number;
  maxCapacity: number;
}

export type PropertyWithoutId = {
  name: string;
  baseCapacity: number;
  maxCapacity: number;
}
export type ImageWithoutId = {
  file: File;
  propertyId: string;
  description: string;
}

export type Image = {
  id: string;
  file: File;
  propertyId: string;
  description: string;
}

export type ImageReturn = {
  id: string;
  propertyId: string;
  idDrive: string;
  description: string
}
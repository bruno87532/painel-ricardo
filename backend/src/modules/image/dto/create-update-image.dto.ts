import { IsString, IsNotEmpty, IsDefined, MinLength } from "class-validator";

export class CreateUpdateImageDto { 
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(1)
  propertyId: string
  
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MinLength(1)
  description: string
}
import { IsString, IsNotEmpty, IsDefined, MinLength } from "class-validator";

export class CreateUpdateDetailDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  propertyId: string
} 
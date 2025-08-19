import { IsString, IsDefined, IsBoolean, IsNotEmpty, MinLength, Min, IsNumber } from "class-validator"
import { Type, Transform } from "class-transformer"

export class CreateUpdatePropertyDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(3)
  name: string

  @IsNumber()
  @Type(() => Number)
  @IsDefined()
  @Min(1)
  baseCapacity: number

  @IsNumber()
  @Type(() => Number)
  @IsDefined()
  @Min(1)
  maxCapacity: number
}
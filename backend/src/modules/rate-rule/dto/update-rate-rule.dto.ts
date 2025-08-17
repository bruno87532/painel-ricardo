import { IsString, MinLength, IsDate, IsArray, ArrayNotEmpty, ArrayUnique, IsEnum, IsNumber, Min, IsOptional } from "class-validator";
import { Transform, Type } from "class-transformer";

enum WeekDay {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

export class UpdateRateRuleDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  propertyId: string


  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value)
  })
  @IsDate()
  startDate: Date

  @IsOptional()
  @Transform(({ value }) => {
    return new Date(value)
  })
  @IsDate()
  endDate: Date

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(WeekDay, { each: true })
  days: WeekDay[]

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  minGuests: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  maxGuests: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  pricePerNightCents: number
  
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  minNights: number
} 



import { IsString, IsDefined, IsNotEmpty, MinLength, IsDate, IsArray, IsIn, ArrayNotEmpty, ArrayUnique, IsEnum, IsNumber, Min, IsOptional } from "class-validator";
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

export class CreateUpdateRateRuleDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
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

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsEnum(WeekDay, { each: true })
  days: WeekDay[]

  @IsNumber()
  @Type(() => Number)
  @IsDefined()
  @Min(1)
  minGuests: number

  @IsNumber()
  @Type(() => Number)
  @IsDefined()
  @Min(1)
  maxGuests: number

  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined
    return Number(value)
  })
  @IsNumber()
  @Type(() => Number)
  @IsDefined()
  @Min(1)
  pricePerNightCents: number

  @IsNumber()
  @Type(() => Number)
  @IsDefined()
  @Min(1)
  minNights: number
}



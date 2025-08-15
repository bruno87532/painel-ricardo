import { IsString, IsDefined, IsNotEmpty, MinLength, IsDate, IsArray, IsIn, ArrayNotEmpty, ArrayUnique, IsEnum, IsNumber, Min } from "class-validator";
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

export class CreateRateRuleDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MinLength(1)
  propertyId: string


  @Transform(({ value }) => {
    return new Date(value)
  })
  @IsDefined()
  @IsDate()
  startDate: Date

  @Transform(({ value }) => {
    return new Date(value)
  })
  @IsDefined()
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


